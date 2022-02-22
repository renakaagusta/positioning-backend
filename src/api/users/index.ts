import { Server } from '@hapi/hapi';
import UsersService from '../../services/firestore/UsersService';
import { UsersValidatorInterface } from '../../validator/users';
import UsersHandler from './handler';
import routes from './routes';

export interface UserPluginParamsInterface {
  service: UsersService
  validator: UsersValidatorInterface
}

export default {
  name: 'users',
  version: '1.0.0',
  register: async (server: Server, params: UserPluginParamsInterface) => {
    const usersHandler = new UsersHandler(params.service, params.validator);
    server.route(routes(usersHandler));
  },
};
