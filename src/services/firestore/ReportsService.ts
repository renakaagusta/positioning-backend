import InvariantError from '../../exceptions/InvariantError'
import NotFoundError from '../../exceptions/NotFoundError'
import * as firebase from 'firebase-admin'
import { ReportInterface } from '../../model/report'
import { report } from 'process';

class ReportsService {
  private _firestore: firebase.firestore.Firestore;
  
  constructor() {
    this._firestore = firebase.firestore()
  }

  async addReport(report: ReportInterface) {
    const result = await this._firestore.collection('reports').add(report)

    if (!result) {
      throw new InvariantError('Report gagal ditambahkan');
    }

    return result.id;
  }

  async getReports() {
    const result = await this._firestore.collection('reports').get()

    const reports: Array<ReportInterface> = []
    
    result.docs.map((report)=>reports.push({
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
}

export default ReportsService