import InvariantError from '../../exceptions/InvariantError'
import NotFoundError from '../../exceptions/NotFoundError'
import * as firebase from 'firebase-admin'
import { PointCollectionInterface } from '../../model/point'

class PointCollectionsService {
  private _firestore: firebase.firestore.Firestore;
  
  constructor() {
    this._firestore = firebase.firestore()
  }

  async addPointCollection(pointCollection: PointCollectionInterface) {
    await this.verifyNewPointCollectionType(pointCollection.type);

    const result = await this._firestore.collection('points').add(pointCollection)

    if (!result) {
      throw new InvariantError('Point collection gagal ditambahkan');
    }

    return result.id;
  }

  async verifyNewPointCollectionType(type: string) {
    const result = await this._firestore.collection('points').where('type', '==', type).get()

    if (result.docs.length > 0) {
      throw new InvariantError('Gagal menambahkan Point Collection. Type sudah digunakan.');
    }
  }

  async getPointCollectionById(pointCollectionId: string) {
    const result = this._firestore.collection('points').doc(pointCollectionId)

    if (!result.id) {
      throw new NotFoundError('Point collection tidak ditemukan');
    }

    return result;
  }
  
  async getPointCollectionList() {
    const result = await this._firestore.collection('points').get()

    const pointCollections: Array<PointCollectionInterface> = []
    
    result.docs.map((pointCollection)=>pointCollections.push({
    id: pointCollection.id,
      ...pointCollection.data() as PointCollectionInterface
    }))

    return pointCollections;
  }
}

export default PointCollectionsService