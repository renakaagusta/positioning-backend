"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (handler) => [{
        method: 'POST',
        path: '/point-collections',
        handler: handler.postPointCollectionHandler,
    },
    {
        method: 'GET',
        path: '/point-collections',
        handler: handler.getPointCollectionsHandler,
    },
    {
        method: 'GET',
        path: '/point-collections/{id}',
        handler: handler.getPointCollectionByIdHandler,
    },
];
exports.default = routes;
