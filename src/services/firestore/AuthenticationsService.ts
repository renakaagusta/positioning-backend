import * as firebase from 'firebase-admin'
import InvariantError from './../../exceptions/InvariantError'

class AuthenticationsService {
  private _firestore: firebase.firestore.Firestore;
  
  constructor() {
    this._firestore = firebase.firestore()
  }

  async addRefreshToken(token: string) {
    return await this._firestore.collection('tokens').add({
      token: token
    });
  }

  async verifyRefreshToken(token: string) {
    const result = await this._firestore.collection('tokens').where('token', '==', token).get()

    if (result.docs.length == 0) {
      throw new InvariantError('Refresh token tidak valid');
    }

    return result
  }

  async deleteRefreshToken(token: string) {
    await this.verifyRefreshToken(token);
    const result = await this._firestore.collection('tokens').where('token', '==', token).get()

    return await Promise.all(result.docs.map((doc)=>{
      doc.ref.delete()
    }));
  }
}

export default AuthenticationsService;