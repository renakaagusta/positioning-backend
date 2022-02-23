"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (handler) => [
    {
        method: 'POST',
        path: '/users',
        handler: handler.postUserHandler,
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: handler.getUserByIdHandler,
    },
    {
        method: 'GET',
        path: '/users',
        handler: handler.getUsersHandler,
    },
];
exports.default = routes;
