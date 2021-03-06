import ClientError from "../../exceptions/ClientError";
import { ReportCategory, ReportInterface, ReportStatus, ReportType } from "../../model/report";
import ReportsService from "../../services/firestore/ReportsService";
import { ReportValidatorInterface } from "../../validator/reports";
import {Request, Server} from "@hapi/hapi"
export interface ReportHandlerInterface {
    _service: ReportsService
    _validator: ReportValidatorInterface;

    postReportHandler: (request: any, h: any) => void;
    putReportHandler: (request: any, h: any) => void;
    getReportsHandler: (request: any, h: any) => void;
    getReportByIdHandler: (request: any, h: any) => void;
    getCalculatedDataHandler: (request: any, h: any) => void;
    deleteReportHandler: (request: any, h: any) => void;
}

class ReportsHandler implements ReportHandlerInterface {
    _service: ReportsService;
    _validator: ReportValidatorInterface;
    constructor(service: ReportsService, validator: ReportValidatorInterface) {
        this._service = service;
        this._validator = validator;

        this.postReportHandler = this.postReportHandler.bind(this);
        this.putReportHandler = this.putReportHandler.bind(this);
        this.getReportsHandler = this.getReportsHandler.bind(this);
        this.getReportByIdHandler = this.getReportByIdHandler.bind(this);
        this.getCalculatedDataHandler = this.getCalculatedDataHandler.bind(this);
        this.deleteReportHandler = this.deleteReportHandler.bind(this);
    }

    async postReportHandler(request: Request, h: any) {
        try {           
            this._validator.validateReportPayload(request.payload);
            const { title, description, rider, handler = null, category, createdAt, startingPoint, endPoint, type } = request.payload as Record<string, any>;

            const report: ReportInterface = {
                title: title as string,
                description: description as string,
                category: category as ReportCategory,
                rider: rider as string,
                handler: handler as string,
                status: ReportStatus.Created,
                startingPoint: startingPoint as number,
                endPoint: endPoint as number,
                type: type as ReportType,
                createdAt: new Date(createdAt)
            }

            const reportId = await new Promise(async (resolve) => await this._service.addReport(report).then((reportId: string) => resolve(reportId)))

            const response = h.response({
                status: 'success',
                message: 'Laporan berhasil ditambahkan',
                data: {
                    reportId,
                },
            });

            response.code(201);

            return response
        } catch (error) {
            console.log(error)
            if (error instanceof ClientError) {
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
                error: (error as Error).message
            });
            response.code(500);
            return response;
        }
    }

    async putReportHandler(request: any, h: any) {
        try {           
            this._validator.validateReportPayload(request.payload);

            const { id } = request.params;
            const { title, description, rider, handler = null, category, createdAt, startingPoint, endPoint, type, status } = request.payload;

            const newReport: ReportInterface = {
                id: id as string, 
                title: title as string,
                description: description as string,
                category: category as ReportCategory,
                rider: rider as string,
                handler: handler as string,
                status: ReportStatus.Created,
                startingPoint: startingPoint,
                endPoint: endPoint,
                type: type,
                createdAt: new Date(createdAt)
            }
            const oldReport = await this._service.getReportById(id);

            const reportId = await new Promise(async (resolve) => await this._service.updateReport(newReport, oldReport, status).then((reportId) => resolve(reportId)))

            const response = h.response({
                status: 'success',
                message: 'Laporan berhasil perbarui',
                data: {
                    reportId,
                },
            });

            response.code(201);

            return response
        } catch (error) {
            if (error instanceof ClientError) {
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
                error: (error as Error).message
            });
            response.code(500);
            return response;
        }
    }

    async getReportsHandler() {
        const reports = await this._service.getReports();
        return {
            status: 'success',
            data: {
                reports,
            },
        };
    }

    async getReportByIdHandler(request: any, h: any) {
        try {
            const { id } = request.params;
            const report = await this._service.getReportById(id);
            return {
                status: 'success',
                data: {
                    report,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
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
    }

    async getCalculatedDataHandler(request: any, h: any) {
        try {
            const calculatedData = await this._service.getCalculatedData();
            return {
                status: 'success',
                data: {
                    calculatedData,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
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
    }

    async deleteReportHandler(request: any, h: any) {
        try {
            const { id } = request.params;
            const report = await this._service.deleteReport(id)
            return {
                status: 'success',
                data: {
                    report,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
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
    }
}

export default ReportsHandler;