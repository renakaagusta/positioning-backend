import { UsersHandlerInterface } from "./handler";

const routes = (handler: UsersHandlerInterface) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
];

export default routes