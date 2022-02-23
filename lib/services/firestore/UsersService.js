"use strict";
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const InvariantError_1 = __importDefault(require("../../exceptions/InvariantError"));
const NotFoundError_1 = __importDefault(require("../../exceptions/NotFoundError"));
const AuthenticationError_1 = __importDefault(require("../../exceptions/AuthenticationError"));
const firebase = __importStar(require("firebase-admin"));
class UsersService {
    constructor() {
        this._firestore = firebase.firestore();
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.verifyNewUsername(user.username);
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            const result = yield this._firestore.collection('users').add(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            if (!result) {
                throw new InvariantError_1.default('User gagal ditambahkan');
            }
            return result.id;
        });
    }
    verifyNewUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('users').where('username', '==', username).get();
            if (result.docs.length > 0) {
                throw new InvariantError_1.default('Gagal menambahkan user. Username sudah digunakan.');
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this._firestore.collection('users').doc(userId);
            if (!result.id) {
                throw new NotFoundError_1.default('User tidak ditemukan');
            }
            return result;
        });
    }
    getUserList() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('users').get();
            const users = [];
            result.docs.map((user) => users.push(Object.assign({ id: user.id }, user.data())));
            return users;
        });
    }
    verifyUserCredential(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('users').where('username', '==', username).get();
            if (!result) {
                throw new AuthenticationError_1.default('Kredensial yang Anda berikan salah');
            }
            const { id, password: hashedPassword } = result.docs[0].data();
            const match = yield bcrypt_1.default.compare(password, hashedPassword);
            if (!match) {
                throw new AuthenticationError_1.default('Kredensial yang Anda berikan salah');
            }
            return id;
        });
    }
}
exports.default = UsersService;
