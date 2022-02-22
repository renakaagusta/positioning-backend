'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.init = exports.server = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const jwt_1 = __importDefault(require("@hapi/jwt"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const authentications_1 = __importDefault(require("./api/authentications"));
const AuthenticationsService_1 = __importDefault(require("./services/firestore/AuthenticationsService"));
const TokenManager_1 = __importDefault(require("./tokenize/TokenManager"));
const authentications_2 = __importDefault(require("./validator/authentications"));
const users_1 = __importDefault(require("./api/users"));
const UsersService_1 = __importDefault(require("./services/firestore/UsersService"));
const users_2 = __importDefault(require("./validator/users"));
const init = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const authenticationsService = new AuthenticationsService_1.default();
        const usersService = new UsersService_1.default();
        exports.server = hapi_1.default.server({
            port: process.env.PORT,
            host: process.env.HOST,
            routes: {
                cors: {
                    origin: ['*'],
                },
            },
        });
        yield exports.server.register([{
                plugin: jwt_1.default,
            },]);
        exports.server.auth.strategy('positioningapp_jwt', 'jwt', {
            keys: process.env.ACCESS_TOKEN_KEY,
            verify: {
                aud: false,
                iss: false,
                sub: false,
                maxAgeSec: process.env.ACCESS_TOKEN_AGE,
            },
            validate: (artifacts) => ({
                isValid: true,
                credentials: {
                    id: artifacts.decoded.payload.id,
                },
            }),
        });
        yield exports.server.register([
            {
                plugin: authentications_1.default,
                options: {
                    authenticationsService,
                    usersService,
                    tokenManager: TokenManager_1.default,
                    validator: authentications_2.default,
                },
            },
            {
                plugin: users_1.default,
                options: {
                    service: usersService,
                    validator: users_2.default,
                },
            },
        ]);
        return exports.server;
    });
};
exports.init = init;
const start = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Listening on ${exports.server.settings.host}:${exports.server.settings.port}`);
        return exports.server.start();
    });
};
exports.start = start;
process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
dotenv.config();
if (firebase_admin_1.default.apps.length === 0) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../firebase-adminsdk.json')).toString()))
    });
}
