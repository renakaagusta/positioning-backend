import { UsersHandlerInterface } from "./handler";

const routes = (handler: UsersHandlerInterface) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {}
  },
  {
    method: 'PUT',
    path: '/users/{id}/photo',
    handler: handler.putUserPhotoHandler,
    options: {
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
    options: {}
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {}
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersHandler,
    options: {}
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteUserHandler,
    options: {}
  },
];

export default routes