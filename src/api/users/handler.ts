import { firestore } from "firebase-admin";
import { UserInterface, UserRole } from "../../model/user";
import UsersService from '../../services/firestore/UsersService';
import { UsersValidatorInterface } from '../../validator/users';
import ClientError from '../../exceptions/ClientError';

export interface UsersHandlerInterface {
  postUserHandler: (request: any, h: any) => void;
  getUserByIdHandler: (request: any, h: any) => void;
  _service: UsersService;
  _validator: UsersValidatorInterface;
}

class UsersHandler implements UsersHandlerInterface {
  _service: UsersService;
  _validator: UsersValidatorInterface;

  constructor(service: UsersService, validator: UsersValidatorInterface) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(request: any, h: any) {
    try {
      this._validator.validateUserPayload(request.payload);
      const { username, password, name, email, role } = request.payload;

      const user: UserInterface = {
        username: username as string,
        name: name as string,
        email: email as string,
        password: password as string,
        role: role as UserRole,
        createdAt: new Date()
      } 

      const userId = await this._service.addUser(user);

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error: any) {
      console.log(error)
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }

  async getUserByIdHandler(request: any, h: any) {
    try {
      const { id } = request.params;
      const user = await this._service.getUserById(id);
      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (error: any) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }
}

export default UsersHandler