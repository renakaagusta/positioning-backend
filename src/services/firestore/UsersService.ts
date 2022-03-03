import Bcrypt from 'bcrypt'
import InvariantError from '../../exceptions/InvariantError'
import NotFoundError from '../../exceptions/NotFoundError'
import AuthenticationError from '../../exceptions/AuthenticationError'
import * as firebase from 'firebase-admin'
import { UserInterface } from '../../model/user'

class UsersService {
  private _firestore: firebase.firestore.Firestore;
  
  constructor() {
    this._firestore = firebase.firestore()
  }

  async addUser(user: UserInterface) {
    await this.verifyNewUsername(user.username);

    const hashedPassword = await Bcrypt.hash(user.password, 10);

    const result = await this._firestore.collection('users').add({
      ...user,
      password: hashedPassword
    })

    if (!result) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.id;
  }


  async updateUser(user: UserInterface) {
    const hashedPassword = await Bcrypt.hash(user.password, 10);

    const result = await this._firestore.collection('users').doc(user.id!).update({
      ...user,
      password: hashedPassword
    })

    if (!result) {
      throw new InvariantError('User gagal diperbarui');
    }

    return user.id;
  }

  async deleteUser(userId: string) {
    const result = await this._firestore.collection('users').doc(userId!).delete()

    if (!result) {
      throw new InvariantError('User gagal dihapus');
    }

    return userId;
  }

  async verifyNewUsername(username: string) {
    const result = await this._firestore.collection('users').where('username', '==', username).get()

    if (result.docs.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async getUserById(userId: string) {
    const result = await this._firestore.collection('users').doc(userId).get()

    if (!result.id) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return {
      id: result.id,
      ...result.data()
    };
  }

  async getUserList() {
    const result = await this._firestore.collection('users').get()

    const users: Array<UserInterface> = []
    
    result.docs.map((user)=>users.push({
      id: user.id,
      ...user.data() as UserInterface
    }))

    return users;
  }

  async verifyUserCredential(username: string, password: string) {
    const result = await this._firestore.collection('users').where('username', '==', username).get()

    if (!result) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.docs[0].data();

    const match = await Bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }
}

export default UsersService