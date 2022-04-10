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
const ClientError_1 = __importDefault(require("../../exceptions/ClientError"));
const report_1 = require("../../model/report");
class ReportsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postReportHandler = this.postReportHandler.bind(this);
        this.getReportsHandler = this.getReportsHandler.bind(this);
        this.getReportByIdHandler = this.getReportByIdHandler.bind(this);
    }
    postReportHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validateReportPayload(request.payload);
                const { title, description, rider, category, createdAt, startingPoint, endPoint, type } = request.payload;
                const report = {
                    title: title,
                    description: description,
                    category: category,
                    rider: rider,
                    status: report_1.ReportStatus.Created,
                    startingPoint: startingPoint,
                    endPoint: endPoint,
                    type: type,
                    createdAt: new Date(createdAt)
                };
                const reportId = yield new Promise((resolve) => __awaiter(this, void 0, void 0, function* () { return yield this._service.addReport(report).then((reportId) => resolve(reportId)); }));
                const response = h.response({
                    status: 'success',
                    message: 'Laporan berhasil ditambahkan',
                    data: {
                        reportId,
                    },
                });
                response.code(201);
                return response;
            }
            catch (error) {
                if (error instanceof ClientError_1.default) {
                    const response = h.response({
                        status: 'fail',
                        message: error.message,
                    });
                    response.code(error.statusCode);
                    return response;
                }
                // Server ERROR!
                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                    error: error.message
                });
                response.code(500);
                return response;
            }
        });
    }
    getReportsHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield this._service.getReports();
            return {
                status: 'success',
                data: {
                    reports,
                },
            };
        });
    }
    getReportByIdHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const report = yield this._service.getReportById(id);
                return {
                    status: 'success',
                    data: {
                        report,
                    },
                };
            }
            catch (error) {
                if (error instanceof ClientError_1.default) {
                    const response = h.response({
                        status: 'fail',
                        message: error.message,
                    });
                    response.code(error.statusCode);
                    return response;
                }
                // Server ERROR!
                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                });
                response.code(500);
                return response;
            }
        });
    }
}
exports.default = ReportsHandler;
