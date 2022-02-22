'use strict';

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import Jwt from '@hapi/jwt'
import firebase from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv';

export let server: Server;

import AuthenticationsPlugin from './api/authentications';
import AuthenticationsService from './services/firestore/AuthenticationsService';
import TokenManager from './tokenize/TokenManager';
import AuthenticationsValidator from './validator/authentications';

import UsersPlugin from './api/users';
import UsersService from './services/firestore/UsersService';
import UsersValidator from './validator/users';

export const init = async function(): Promise<Server> {
    const authenticationsService = new AuthenticationsService()
    const usersService = new UsersService()
    
    server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([{
        plugin: Jwt as any,
    },])

    server.auth.strategy('positioningapp_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts: any) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    await server.register([
        {
            plugin: AuthenticationsPlugin,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
        {
            plugin: UsersPlugin,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
    ]);

    return server;
};

export const start = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    return server.start();
};

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});

dotenv.config()

if (firebase.apps.length === 0) {
    firebase.initializeApp({
      credential: firebase.credential.cert(JSON.parse(fs.readFileSync(path.join(__dirname, '../firebase-adminsdk.json')).toString()))
    })
  }
  