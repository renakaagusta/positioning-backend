import Bcrypt from 'bcrypt'
import * as firebase from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { v4 as uuid } from 'uuid'
import AuthenticationError from '../../exceptions/AuthenticationError'
import InvariantError from '../../exceptions/InvariantError'
import NotFoundError from '../../exceptions/NotFoundError'
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

  async updateUserPhoto(userId: string, photo: any) {
    const filePath = path.join(`/uploads/${String(userId)}/${photo.filenamename}`)

    const storageRef = firebase.storage().bucket(`gs://positioning-bdf84.appspot.com`);
    const publicUrl = await storageRef.upload(photo.path, {
      public: true,
      destination: filePath,
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      }
    });
    
    const user: UserInterface = await this.getUserById(userId)
    
    if(user) {
      if(user.meta) {
        user.meta.photo = publicUrl[0].metadata.mediaLink
      } else {
        user.meta = {
          photo:  publicUrl[0].metadata.mediaLink
        }
      }
    }

    const result = this._firestore.collection('users').doc(userId).update(user)
    
    if (!result) {
      throw new InvariantError('User gagal diperbarui');
    }

    return publicUrl[0].metadata.mediaLink;
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
    } as UserInterface;
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
    if (result.docs.length == 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { password: hashedPassword } = result.docs[0].data();

    const match = await Bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return result.docs[0].id;
  }

  async updateUserFCMToken(user: UserInterface, fcmToken: string) {
    const result = await this._firestore.collection('users').doc(user.id!).update({
      ...user,
      fcmToken: fcmToken
    }) 

    return result;
  }
}

export default UsersService