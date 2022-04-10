import { ReportHandlerInterface } from "./handler";

const routes = (handler: ReportHandlerInterface) => [{
        method: 'POST',
        path: '/reports',
        handler: handler.postReportHandler,
    },
    {
        method: 'GET',
        path: '/reports',
        handler: handler.getReportsHandler,
    },
    {
        method: 'GET',
        path: '/reports/{id}',
        handler: handler.getReportByIdHandler,
    },
    {
        method: 'GET',
        path: '/reports/calculated-data',
        handler: handler.getCalculatedDataHandler,
    },
];

export default routes