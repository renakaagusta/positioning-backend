import ReportsService from '../../services/firestore/ReportsService';
import { ReportValidatorInterface } from '../../validator/reports';
import ReportsHandler from './handler';
import routes from './routes';

export interface ReportPluginParamsInterface {
    service: ReportsService
    validator: ReportValidatorInterface
  }

export default {
    name: 'reports',
    version: '1.0.0',
    register: async(server: any, params: ReportPluginParamsInterface) => {
        const reportsHandler = new ReportsHandler(params.service, params.validator);
        server.route(routes(reportsHandler));
    },
};