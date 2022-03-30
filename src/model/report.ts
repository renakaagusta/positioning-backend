import { LocationInterface } from "./user";

export enum ReportCategory {
  TrafficJam='Traffic Jam',
  Accident='Accident' 
}

export enum ReportStatus {
  Created='Created',
  Confirmed='Confirmed',
  Rejected='Rejected' 
}

export enum ReportType {
  Simulation='Simulation',
  Real='Real'
}
export interface ReportInterface {
  id?: string
  rider: string
  handler?: string
  handlerLocation?: LocationInterface
  title: string
  description: string
  location?: LocationInterface
  category: ReportCategory
  type: ReportType
  status: ReportStatus
  startingPoint: number
  endPoint: number
  routes?: Array<Array<number>>
  rejectedBy?: Array<string>
  createdAt: Date
}