import * as firebase from 'firebase-admin';
import InvariantError from '../../exceptions/InvariantError';
import NotFoundError from '../../exceptions/NotFoundError';
import { connector, route_setup } from '../../helpers/routing';
import { PointCollectionInterface } from '../../model/pointCollection';
import { ReportInterface, ReportStatus } from '../../model/report';
import { RouteCollectionInterface } from '../../model/routeCollection';

class ReportsService {
  private _firestore: firebase.firestore.Firestore;

  constructor() {
    this._firestore = firebase.firestore()
  }

  async addReport(report: ReportInterface) {
    const pointResult = await this._firestore.collection('points').get()
    const pointCollections: Array<PointCollectionInterface> = []
    pointResult.docs.map((pointCollection) => pointCollections.push({
      id: pointCollection.id,
      ...pointCollection.data() as PointCollectionInterface
    }))

    const routeResult = await this._firestore.collection('routes').get()
    const routeCollections: Array<RouteCollectionInterface> = []
    routeResult.docs.map((routeCollection) => routeCollections.push({
      id: routeCollection.id,
      ...routeCollection.data() as RouteCollectionInterface
    }))

    const reportId = await new Promise<string>(async (resolve)=>{
      await connector(routeCollections[0], report.createdAt.getTime()).then(async () => {
        const routes = route_setup(report.startingPoint, report.endPoint, pointCollections[0]);
        report.routes = routes
  
        const result = await this._firestore.collection('reports').add(report)
  
        if (!result) {
          throw new InvariantError('Report gagal ditambahkan');
        }
  
        resolve(result.id)
      })
    })

    return reportId
  }

  async getReports() {
    const result = await this._firestore.collection('reports').get()

    const reports: Array<ReportInterface> = []

    result.docs.map((report) => reports.push({
      id: report.id,
      ...report.data() as ReportInterface
    }))

    return reports;
  }

  async getReportById(reportId: string) {
    const result = await this._firestore.collection('reports').doc(reportId).get()

    if (!result.id) {
      throw new NotFoundError('Report tidak ditemukan');
    }

    const report: ReportInterface = {
      id: result.id,
      ...result.data() as ReportInterface
    }

    return report;
  }

  async getCalculatedData() {
    const pointResult = await this._firestore.collection('points').get()
    const pointCollections: Array<PointCollectionInterface> = []

    pointResult.docs.map((pointCollection) => pointCollections.push({
      id: pointCollection.id,
      ...pointCollection.data() as PointCollectionInterface
    }))

    const routeResult = await this._firestore.collection('routes').get()
    const routeCollections: Array<RouteCollectionInterface> = []

    routeResult.docs.map((routeCollection) => routeCollections.push({
      id: routeCollection.id,
      ...routeCollection.data() as RouteCollectionInterface
    }))

    const calculatedData = await new Promise<(number | String)[][]>(async (resolve)=>{ 
      await connector(routeCollections[0], new Date().getTime()).then(async (calculatedData) => resolve(calculatedData))
    })

    return calculatedData
  }

  async updateReport(newReport: ReportInterface, oldReport: ReportInterface, status: ReportStatus) {
    const pointResult = await this._firestore.collection('points').get()
    const pointCollections: Array<PointCollectionInterface> = []
    pointResult.docs.map((pointCollection) => pointCollections.push({
      id: pointCollection.id,
      ...pointCollection.data() as PointCollectionInterface
    }))

    const routeResult = await this._firestore.collection('routes').get()
    const routeCollections: Array<RouteCollectionInterface> = []
    routeResult.docs.map((routeCollection) => routeCollections.push({
      id: routeCollection.id,
      ...routeCollection.data() as RouteCollectionInterface
    }))

    console.log(newReport);
    console.log(oldReport);
    console.log(status);
    //return oldReport.id;
    const reportId = await new Promise<string>(async (resolve)=>{
      await connector(routeCollections[0], newReport.createdAt.getTime()).then(async () => {
        const routes = route_setup(newReport.startingPoint, newReport.endPoint, pointCollections[0]);
        newReport.routes = routes
        
        if(status == ReportStatus.Rejected) {
          if(oldReport.rejectedBy != null) {
            newReport.rejectedBy = [...oldReport.rejectedBy, ...[oldReport.handler!]]
          } else {
            newReport.rejectedBy = [...[oldReport.handler!]]
          }
          
          newReport.status = ReportStatus.Created
        } else {
          newReport.status = status
        }
  
        const result = await this._firestore.collection('reports').doc(newReport.id!).update(newReport)
  
        if (!result) {
          throw new InvariantError('Report gagal ditambahkan');
        }
  
        resolve(newReport.id!)
      })
    })

    return reportId
  }

  async deleteReport(reportId: string) {
    const result = await this._firestore.collection('reports').doc(reportId).delete()

    if (!result) {
      throw new NotFoundError('Report tidak ditemukan');
    }

    return reportId;
  }
}

export default ReportsService