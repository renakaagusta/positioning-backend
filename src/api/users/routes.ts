import { RouteOptions } from "@hapi/hapi";
import { UsersHandlerInterface } from "./handler";

const routes = (handler: UsersHandlerInterface) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'PUT',
    path: '/users/{id}/photo',
    handler: handler.putUserPhotoHandler,
    config: {
      payload: {
          allow: 'multipart/form-data',
          multipart: true,
          parse: true,
          output: 'file',
          maxBytes: 5120000,
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.putUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteUserHandler,
  },
];

export default routes