"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (handler) => [{
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
];
exports.default = routes;
