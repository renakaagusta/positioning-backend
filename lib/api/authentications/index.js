"use strict";
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
const handler_1 = __importDefault(require("./handler"));
const routes_1 = __importDefault(require("./routes"));
exports.default = {
    name: 'authentications',
    version: '1.0.0',
    register: (server, params) => __awaiter(void 0, void 0, void 0, function* () {
        const authenticationsHandler = new handler_1.default(params.authenticationsService, params.usersService, params.tokenManager, params.validator);
        server.route((0, routes_1.default)(authenticationsHandler));
    }),
};
