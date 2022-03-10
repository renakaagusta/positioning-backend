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
    {
        method: 'PUT',
        path: '/point-collections/{id}',
        handler: handler.putPointCollectionHandler,
    },
    {
        method: 'DELETE',
        path: '/point-collections/{id}',
        handler: handler.deletePointCollectionHandler,
    },
];
exports.default = routes;
