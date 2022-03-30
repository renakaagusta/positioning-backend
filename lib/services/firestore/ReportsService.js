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
const routing_1 = require("../../helpers/routing");
class ReportsService {
    constructor() {
        this._firestore = firebase.firestore();
    }
    addReport(report) {
        return __awaiter(this, void 0, void 0, function* () {
            const pointResult = yield this._firestore.collection('points').get();
            const pointCollections = [];
            pointResult.docs.map((pointCollection) => pointCollections.push(Object.assign({ id: pointCollection.id }, pointCollection.data())));
            const routeResult = yield this._firestore.collection('routes').get();
            const routeCollections = [];
            routeResult.docs.map((routeCollection) => routeCollections.push(Object.assign({ id: routeCollection.id }, routeCollection.data())));
            const reportId = yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                yield (0, routing_1.connector)(routeCollections[0], report.createdAt.getTime()).then(() => __awaiter(this, void 0, void 0, function* () {
                    const routes = (0, routing_1.route_setup)(report.startingPoint, report.endPoint, pointCollections[0]);
                    report.routes = routes;
                    const result = yield this._firestore.collection('reports').add(report);
                    if (!result) {
                        throw new InvariantError_1.default('Report gagal ditambahkan');
                    }
                    resolve(result.id);
                }));
            }));
            return reportId;
        });
    }
    getReports() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('reports').get();
            const reports = [];
            result.docs.map((report) => reports.push(Object.assign({ id: report.id }, report.data())));
            return reports;
        });
    }
    getReportById(reportId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._firestore.collection('reports').doc(reportId).get();
            if (!result.id) {
                throw new NotFoundError_1.default('Report tidak ditemukan');
            }
            const report = Object.assign({ id: result.id }, result.data());
            return report;
        });
    }
}
exports.default = ReportsService;
