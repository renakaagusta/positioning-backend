import AuthenticationsService from '../../services/firestore/AuthenticationsService';
import UsersService from '../../services/firestore/UsersService';
import { TokenManagerInterface } from '../../tokenize/TokenManager';
import { AuthenticationsValidatorInterface } from '../../validator/authentications';
import AuthenticationsHandler from './handler';
import routes from './routes'

interface AuthenticationPluginParamsInterface {
  authenticationsService: AuthenticationsService
  usersService: UsersService
  tokenManager: TokenManagerInterface
  validator: AuthenticationsValidatorInterface
}

export default {
  name: 'authentications',
  version: '1.0.0',
  register: async (server: any, params: AuthenticationPluginParamsInterface) => {
    const authenticationsHandler = new AuthenticationsHandler(
      params.authenticationsService,
      params.usersService,
      params.tokenManager,
      params.validator,
    );
    server.route(routes(authenticationsHandler));
  },
};
