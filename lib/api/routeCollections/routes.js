"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (handler) => [{
        method: 'POST',
        path: '/route-collections',
        handler: handler.postRouteCollectionHandler,
    },
    {
        method: 'GET',
        path: '/route-collections',
        handler: handler.getRouteCollectionsHandler,
    },
    {
        method: 'GET',
        path: '/route-collections/{id}',
        handler: handler.getRouteCollectionByIdHandler,
    },
];
exports.default = routes;
