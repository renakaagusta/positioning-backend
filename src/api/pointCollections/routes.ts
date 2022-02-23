import { PointCollectionHandlerInterface } from "./handler";

const routes = (handler: PointCollectionHandlerInterface) => [{
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

export default routes