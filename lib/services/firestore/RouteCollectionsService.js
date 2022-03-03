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
const InvariantError_1 = __importDefault(require("../../exceptions/InvariantError"));
const NotFoundError_1 = __importDefault(require("../../exceptions/NotFoundError"));
const firebase = __importStar(require("firebase-admin"));
class RouteCollectionsService {
    constructor() {
        this._firestore = firebase.firestore();
    }
    addRouteCollection(routeCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.verifyNewRouteCollectionType(routeCollection.type);
            const result = yield this._firestore.collection('routes').add(routeCollection);
            if (!result) {
                throw new InvariantError_1.default('Route collection gagal ditambahkan');
            }
            return result.id;
        });
    }
    verifyNewRouteCollectionType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('routes').where('type', '==', type).get();
            if (result.docs.length > 0) {
                throw new InvariantError_1.default('Gagal menambahkan Route Collection. Type sudah digunakan.');
            }
        });
    }
    getRouteCollectionById(routeCollectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this._firestore.collection('routes').doc(routeCollectionId);
            if (!result.id) {
                throw new NotFoundError_1.default('Route collection tidak ditemukan');
            }
            return result;
        });
    }
    getRouteCollectionList() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('routes').get();
            const routeCollections = [];
            result.docs.map((routeCollection) => routeCollections.push(Object.assign({ id: routeCollection.id }, routeCollection.data())));
            return routeCollections;
        });
    }
    updateRouteCollection(routeCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('routes').doc(routeCollection.id).update(routeCollection);
            if (!result) {
                throw new InvariantError_1.default('Route collection gagal diperbarui');
            }
            return routeCollection.id;
        });
    }
    deleteRouteCollection(routeCollectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('routes').doc(routeCollectionId).delete();
            if (!result) {
                throw new InvariantError_1.default('Route collection gagal dihapus');
            }
            return routeCollectionId;
        });
    }
}
exports.default = RouteCollectionsService;
