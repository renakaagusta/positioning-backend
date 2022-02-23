import { RouteCollectionHandlerInterface } from "./handler";

const routes = (handler: RouteCollectionHandlerInterface) => [{
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

export default routes