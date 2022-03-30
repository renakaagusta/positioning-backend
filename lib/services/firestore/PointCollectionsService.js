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
class PointCollectionsService {
    constructor() {
        this._firestore = firebase.firestore();
    }
    addPointCollection(pointCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.verifyNewPointCollectionType(pointCollection.type);
            const result = yield this._firestore.collection('points').add(pointCollection);
            if (!result) {
                throw new InvariantError_1.default('Point collection gagal ditambahkan');
            }
            return result.id;
        });
    }
    verifyNewPointCollectionType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('points').where('type', '==', type).get();
            if (result.docs.length > 0) {
                throw new InvariantError_1.default('Gagal menambahkan Point Collection. Type sudah digunakan.');
            }
        });
    }
    getPointCollectionList() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('points').get();
            const pointCollections = [];
            result.docs.map((pointCollection) => pointCollections.push(Object.assign({ id: pointCollection.id }, pointCollection.data())));
            return pointCollections;
        });
    }
    getPointCollectionById(pointCollectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('points').doc(pointCollectionId).get();
            if (!result.id) {
                throw new NotFoundError_1.default('Point collection tidak ditemukan');
            }
            return Object.assign({ id: result.id }, result.data());
        });
    }
    updatePointCollection(pointCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('points').doc(pointCollection.id).update(pointCollection);
            if (!result) {
                throw new InvariantError_1.default('Point collection gagal diperbarui');
            }
            return pointCollection.id;
        });
    }
    deletePointCollection(pointCollectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('points').doc(pointCollectionId).delete();
            if (!result) {
                throw new InvariantError_1.default('Point collection gagal dihapus');
            }
            return pointCollectionId;
        });
    }
}
exports.default = PointCollectionsService;