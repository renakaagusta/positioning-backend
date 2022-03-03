import InvariantError from '../../exceptions/InvariantError'
import NotFoundError from '../../exceptions/NotFoundError'
import * as firebase from 'firebase-admin'
import { RouteCollectionInterface } from '../../model/routeCollection'

class RouteCollectionsService {
  private _firestore: firebase.firestore.Firestore;
  
  constructor() {
    this._firestore = firebase.firestore()
  }

  async addRouteCollection(routeCollection: RouteCollectionInterface) {
    await this.verifyNewRouteCollectionType(routeCollection.type);

    const result = await this._firestore.collection('routes').add(routeCollection)

    if (!result) {
      throw new InvariantError('Route collection gagal ditambahkan');
    }

    return result.id;
  }

  async verifyNewRouteCollectionType(type: string) {
    const result = await this._firestore.collection('routes').where('type', '==', type).get()

    if (result.docs.length > 0) {
      throw new InvariantError('Gagal menambahkan Route Collection. Type sudah digunakan.');
    }
  }

  async getRouteCollectionById(routeCollectionId: string) {
    const result = this._firestore.collection('routes').doc(routeCollectionId)

    if (!result.id) {
      throw new NotFoundError('Route collection tidak ditemukan');
    }

    return result;
  }
  
  async getRouteCollectionList() {
    const result = await this._firestore.collection('routes').get()

    const routeCollections: Array<RouteCollectionInterface> = []
    
    result.docs.map((routeCollection)=>routeCollections.push({
    id: routeCollection.id,
      ...routeCollection.data() as RouteCollectionInterface
    }))

    return routeCollections;
  }

  async updateRouteCollection(routeCollection: RouteCollectionInterface) {
    const result = await this._firestore.collection('routes').doc(routeCollection.id!).update(routeCollection)

    if (!result) {
      throw new InvariantError('Route collection gagal diperbarui');
    }

    return routeCollection.id;
  }

  async deleteRouteCollection(routeCollectionId: string) {
    const result = await this._firestore.collection('routes').doc(routeCollectionId).delete()

    if (!result) {
      throw new InvariantError('Route collection gagal dihapus');
    }

    return routeCollectionId;
  }
}

export default RouteCollectionsService