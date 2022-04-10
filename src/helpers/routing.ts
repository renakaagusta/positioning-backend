import { PointCollectionInterface } from "../model/pointCollection"
import {Client, DistanceMatrixRequest} from "@googlemaps/google-maps-services-js";
import axios from "axios";
import { RouteCollectionInterface, RouteInterface } from "../model/routeCollection";

interface DirectedGraphInterface {
  vertices: any,
  addVertex: (name: string, edges: any) => void
}

class DirectedGraph implements DirectedGraphInterface {
  vertices: any
  addVertex: (name: string, edges?: any) => void

  constructor(){
    this.vertices = {}
    this.addVertex = async function (name, edges) {
      edges = edges || null
      this.vertices[name] = edges
    }
  }
}

let graph = new DirectedGraph()
let INFINITY = 1 / 0
let x_path: Array<any> = []
let totalShortestPathWeight = 0

let length: number = 0
let density: number = 0
let roadLengthVeryShort = 0,
  roadLengthShort = 0,
  roadLengthModerate = 0,
  roadLengthLong = 0,
  roadLengthVeryLong = 0
let roadDensityVeryLow = 0,
  roadDensityLow = 0,
  roadDensityModerate = 0,
  roadDensityDense = 0,
  roadDensityVeryDense = 0
let a1 = 0,
  a2 = 0,
  a3 = 0,
  a4 = 0,
  a5 = 0,
  a6 = 0,
  a7 = 0,
  a8 = 0,
  a9 = 0,
  a10 = 0,
  a11 = 0,
  a12 = 0,
  a13 = 0,
  a14 = 0,
  a15 = 0,
  a16 = 0,
  a17 = 0,
  a18 = 0,
  a19 = 0,
  a20 = 0,
  a21 = 0,
  a22 = 0,
  a23 = 0,
  a24 = 0,
  a25 = 0
let z1 = 0,
  z2 = 0,
  z3 = 0,
  z4 = 0,
  z5 = 0,
  z6 = 0,
  z7 = 0,
  z8 = 0,
  z9 = 0,
  z10 = 0,
  z11 = 0,
  z12 = 0,
  z13 = 0,
  z14 = 0,
  z15 = 0,
  z16 = 0,
  z17 = 0,
  z18 = 0,
  z19 = 0,
  z20 = 0,
  z21 = 0,
  z22 = 0,
  z23 = 0,
  z24 = 0,
  z25 = 0;
export let calculatedData: (number | String)[][] = []

var data = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.73640583197016,
          -7.2419431033902075
        ]
      },
      "properties": {
        "text": "0"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.733841,
          -7.240861
        ]
      },
      "properties": {
        "text": "1"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.736169,
          -7.241217
        ]
      },
      "properties": {
        "text": "2"
      }
    },

    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.736104,
          -7.240695
        ]
      },
      "properties": {
        "text": "3"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.737620,
          -7.240638
        ]
      },
      "properties": {
        "text": "4"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.737589,
          -7.240283
        ]
      },
      "properties": {
        "text": "5"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.736087,
          -7.240198
        ]
      },
      "properties": {
        "text": "6"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.734029,
          -7.239560
        ]
      },
      "properties": {
        "text": "7"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.734176,
          -7.238802
        ]
      },
      "properties": {
        "text": "8"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.735021,
          -7.238922
        ]
      },
      "properties": {
        "text": "9"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.736226,
          -7.239244
        ]
      },
      "properties": {
        "text": "10"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.737437,
          -7.239257
        ]
      },
      "properties": {
        "text": "11"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.737431,
          -7.238482
        ]
      },
      "properties": {
        "text": "12"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.735334,
          -7.237812
        ]
      },
      "properties": {
        "text": "13"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          112.734207,
          -7.237250
        ]
      },
      "properties": {
        "text": "14"
      }
    },
  ]
}

export async function connector(routeCollection: RouteCollectionInterface, time: number){
  x_path = []
  graph = new DirectedGraph()
  /*const sortedRoute: RouteCollectionInterface = {
    id: routeCollection.id,
    routes: routeCollection.routes.sort((a:RouteInterface,b:RouteInterface)=>(parseInt(a.from) - parseInt(b.from))),
    type: routeCollection.type
  }*/
  await Promise.all(routeCollection.routes.map(async (route)=>{
    let weightOfRoute: any = {}
    await Promise.all(route.to.map(async (to)=>{
      await weight(data.features[parseInt(route.from)].geometry["coordinates"], data.features[parseInt(to)].geometry["coordinates"], route.from.toString(), to.toString(), time).then((result: number)=>{
        weightOfRoute[to] = result

        if(route.to != null) {
          graph.addVertex(route.from, weightOfRoute)
        } else {
          graph.addVertex(route.from)
        }
      })
      return 0;
    }))
  })) 

  return calculatedData
}

export function route_setup(startingPoint: number, endPoint: number, pointCollection: PointCollectionInterface) {
  let out = dijkstra(graph, String(startingPoint))

  let points: Array<any> = []

  for (let i = 0; i < pointCollection.data.length; i++) {
    for (let j = 0; j < out.shortestPaths[endPoint].length; j++) {
      if (String(i) == out.shortestPaths[endPoint][j]) {
        let x_i = i
        x_path.push({
          lat: pointCollection.data[x_i].geometry.coordinates[1],
          lng: pointCollection.data[x_i].geometry.coordinates[0]
        })

        points.push(x_i)
      }
    }
  }
  x_path.push({
    lat: pointCollection.data[endPoint].geometry.coordinates[1],
    lng: pointCollection.data[endPoint].geometry.coordinates[0]
  })
  points.forEach((point, index) => {
    if(points[index+1]) {
      if (graph.vertices[point][(points[index + 1])] && points[index+1]) {
        totalShortestPathWeight += graph.vertices[point][(points[index + 1])]
      }
    }
  })

  console.log("x_path")
  console.log(x_path)

  return x_path
}

export function dijkstra(graph: any, startVertex: any) {
  let dist: any = {}
  let prev: any = {}
  let q: any = {}
  let shortestPaths: any  = {}

  for (let vertex in graph.vertices) {
    dist[vertex] = INFINITY
    prev[vertex] = null
    q[vertex] = graph.vertices[vertex]
    shortestPaths[vertex] = []
  }
  dist[startVertex] = 0

  while (Object.keys(q).length !== 0) {
    let smallest = findSmallest(dist, q)
    let smallestNode = graph.vertices[smallest!]
    for (let neighbor in smallestNode) {
      let alt = dist[smallest!] + smallestNode[neighbor]
      if (alt < dist[neighbor]) {
        dist[neighbor] = alt
        prev[neighbor] = smallest
      }
    }
  }

  getShortestPaths(prev, shortestPaths, startVertex, dist)

  return {
    shortestPaths: shortestPaths,
    shortestDistances: dist
  }
}

const findSmallest = (dist: any, q: any)=>{
  let min = Infinity
  let minNode: any
  for (let node in q) {
    if (dist[node] <= min) {
      min = dist[node]
      minNode = node
    }
  }

  delete q[minNode]
  return minNode
}

export function getShortestPaths(previous: any, shortestPaths: any, startVertex: any, dist: any) {
  for (let node in shortestPaths) {
    let path = shortestPaths[node]

    while (previous[node]) {
      path.push(node)
      node = previous[node]
    }

    if (dist[node] === 0) {
      path.push(node)
    }
    path.reverse()
  }
}

export const toRad = (params: number)=> {
  return (params* Math.PI) / 180
}

export async function weight(a: Array<number>, b: Array<number>, from: String, to: String, time?: number) {
  let distance = 0
  let trafficLevel = 0

  if(!time) {
    time = new Date().getTime()
  }

  interface DistanceMatrixResponse {
   rows: Array<{
     elements: Array<{
       duration_in_traffic: {
         value: number
       }
       duration: {
        value: number
      }
     }>
   }> 
  }   
  
  const result = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${a[1]}%2C${a[0]}&destinations=${b[1]}%2C${b[0]}&departure_time=${time}&traffic_model=optimistic&mode=driving&key=${process.env.GOOGLE_MAPS_CLIENT_SECRET}`)
  const response = result.data as DistanceMatrixResponse
  let R = 6371
  let x1 = b[1] - a[1]
  let dLat = toRad(x1)
  let x2 = b[0] - a[0]
  let dLon = toRad(x2)
  let c = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(a[1])) *Math.cos(toRad(b[1])) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  let d = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c))
  distance = R * d * 1000

  trafficLevel = response.rows[0].elements[0].duration_in_traffic.value > response.rows[0].elements[0].duration.value ? (response.rows[0].elements[0].duration_in_traffic.value - response.rows[0].elements[0].duration.value) / response.rows[0].elements[0].duration.value : 0

  if (trafficLevel > 1) {
    trafficLevel = 1
  }
  length = distance;
  density = trafficLevel

  fuzzyfication();
  rules();

  calculatedData.push([from, to, response.rows[0].elements[0].duration.value, response.rows[0].elements[0].duration_in_traffic.value, distance, defuzzyfication()])
  //console.log(calculatedData)
 
  /*console.log(from+"-"+to)
  console.log("roadLengthVeryShort")
  console.log(roadLengthVeryShort)
  console.log("roadLengthShort")
  console.log(roadLengthShort)
  console.log("roadLengthModerate")
  console.log(roadLengthModerate)
  console.log("roadLengthLong")
  console.log(roadLengthLong)
  console.log("roadLengthVeryLong")
  console.log(roadLengthVeryLong)
  console.log("roadDensityVeryLow")
  console.log(roadDensityVeryLow)
  console.log("roadDensityShort")
  console.log(roadDensityLow)
  console.log("roadDensityModerate")
  console.log(roadDensityModerate)
  console.log("roadDensityLong")
  console.log(roadDensityDense)
  console.log("roadDensityVeryShort")
  console.log(roadDensityVeryDense)
  console.log("a1")
  console.log(a1)
  console.log("a2")
  console.log(a2)
  console.log("a3")
  console.log(a3)
  console.log("a4")
  console.log(a4)
  console.log("a5")
  console.log(a5)
  console.log("a6")
  console.log(a6)
  console.log("a7")
  console.log(a7)
  console.log("a8")
  console.log(a8)
  console.log("a9")
  console.log(a9)
  console.log("a10")
  console.log(a10)
  console.log("a11")
  console.log(a11)
  console.log("a12")
  console.log(a12)
  console.log("a13")
  console.log(a13)
  console.log("a14")
  console.log(a14)
  console.log("a15")
  console.log(a15)
  console.log("a16")
  console.log(a16)
  console.log("a17")
  console.log(a17)
  console.log("a18")
  console.log(a18)
  console.log("a19")
  console.log(a19)
  console.log("a20")
  console.log(a20)
  console.log("a21")
  console.log(a21)
  console.log("a22")
  console.log(a22)
  console.log("a23")
  console.log(a23)
  console.log("a24")
  console.log(a24)
  console.log("a25")
  console.log(a25)
  console.log("defuzzy")*/
  if(isNaN(defuzzyfication())) {
    return 0
  } else {
    return defuzzyfication()
  }
}

function calcRoadLengthVeryShort() {
  if (length < 50) {
    roadLengthVeryShort = 1
  } else if (length >= 50 && length < 70) {
    roadLengthVeryShort = (80 - length) / (80 - 50)
  } else if (length >= 70) {
    roadLengthVeryShort = 0
  }
}

function calcRoadLengthShort() {
  if (length >= 50 && length < 70) { 
    roadLengthShort = (70 - length) / (70 - 50)
  } else if (length >= 70 && length < 120) { 
    roadLengthShort = 1
  } else if (length >= 110 && length < 130) { 
    roadLengthShort = (130 - length) / (130 - 110)
  }
}

function calcRoadLengthModerate() {
  if (length >= 110 && length < 130) {
    roadLengthModerate = (130 - length) / (130 - 110)
  } else if (length >= 130 && length < 170) {
    roadLengthModerate = 1
  } else if (length >= 170 && length < 190) {
    roadLengthModerate = (190 - length) / (190 - 170)
  }
}

function calcRoadLengthLong() {
  if (length >= 170 && length < 190) {
    roadLengthLong = (190 - length) / (190 - 170)
  } else if (length >= 190 && length < 230) {
    roadLengthLong = 1
  } else if (length >= 230 && length < 250) {
    roadLengthLong = (250 - length) / (250 - 230)
  }
}

function calcRoadLengthVeryLong() {
  if (length >= 230 && length < 250) {
    roadLengthVeryLong = (250 - length) / (250 - 230)
  } else if (length >= 250) {
    roadLengthVeryLong = 1
  }
}

function calcRoadDensityVeryLow() {
  if (density < 0.15) {
    roadDensityVeryLow = 1
  } else if (density >= 0.15 && density < 0.25) {
    roadDensityVeryLow = (0.25 - density) / (0.25 - 0.15)
  } else if (density >= 0.25) {
    roadDensityVeryLow = 0
  }
}

function calcRoadDensityLow() {
  if (density >= 0.15 && density < 0.25) {
    roadDensityLow = (0.25 - density) / (0.25 - 0.15)
  } else if (density >= 0.25 && density < 0.35) {
    roadDensityLow = 1
  } else if (density >= 0.35 && density < 0.45) {
    roadDensityLow = (0.45 - density) / (0.45 - 0.35)
  }
}

function calcRoadDensityModerate() {
  if (density >= 0.35 && density < 0.45) {
    roadDensityModerate = (0.45 - density) / (0.45 - 0.35)
  } else if (density >= 0.45 && density < 0.55) {
    roadDensityModerate = 1
  } else if (density >= 0.55 && density < 0.65) {
    roadDensityModerate = (0.65 - density) / (0.65 - 0.55)
  }
}

function calcRoadDensityDense() {
  if (density >= 0.55 && density < 0.65) {
    roadDensityDense = (0.55 - density) / (0.65 - 0.55)
  } else if (density >= 0.65 && density < 0.75) {
    roadDensityDense = 1
  } else if (density >= 0.75 && density < 0.85) {
    roadDensityDense = (0.85 - density) / (0.85 - 0.75)
  }
}

function calcRoadDensityVeryDense() {
  if (density >= 0.75 && density < 0.85) {
    roadDensityVeryDense = (0.85 - density) / (0.85 - 0.75)
  } else if (density >= 0.85) {
    roadDensityVeryDense = 1
  }
}

function fuzzyfication() {
  calcRoadDensityVeryDense()
  calcRoadDensityDense()
  calcRoadDensityModerate()
  calcRoadDensityLow()
  calcRoadDensityVeryLow() 
  calcRoadLengthVeryLong()
  calcRoadLengthLong()
  calcRoadLengthModerate()
  calcRoadLengthShort()
  calcRoadLengthVeryShort()
}

function rules() {
  fuzzyfication()
  a1 = Math.min(roadLengthVeryShort, roadDensityVeryLow)
  z1 = length + 5 * a1
  a2 = Math.min(roadLengthVeryShort, roadDensityLow)
  z2 = length + 5 * a2
  a3 = Math.min(roadLengthVeryShort, roadDensityModerate)
  z3 = length + 5 * a3
  a4 = Math.min(roadLengthVeryShort, roadDensityDense)
  z4 = length + 5 * a4
  a5 = Math.min(roadLengthVeryShort, roadDensityVeryDense)
  z5 = length + 5 * a5
  a6 = Math.min(roadLengthShort, roadDensityVeryLow)
  z6 = length + 5 * a6
  a7 = Math.min(roadLengthShort, roadDensityLow)
  z7 = length + 5 * a7
  a8 = Math.min(roadLengthShort, roadDensityModerate)
  z8 = length + 5 * a8
  a9 = Math.min(roadLengthShort, roadDensityDense)
  z9 = length + 5 * a9
  a10 = Math.min(roadLengthShort, roadDensityVeryDense)
  z10 = length + 5 * a10
  a11 = Math.min(roadLengthModerate, roadDensityVeryLow)
  z11 = length + 5 * a11
  a12 = Math.min(roadLengthModerate, roadDensityLow)
  z12 = length + 5 * a12
  a13 = Math.min(roadLengthModerate, roadDensityModerate)
  z13 = length + 5 * a13
  a14 = Math.min(roadLengthModerate, roadDensityDense)
  z14 = length + 5 * a14
  a15 = Math.min(roadLengthModerate, roadDensityVeryDense)
  z15 = length + 5 * a15
  a16 = Math.min(roadLengthLong, roadDensityVeryLow)
  z16 = length + 5 * a16
  a17 = Math.min(roadLengthLong, roadDensityLow)
  z17 = length + 5 * a17
  a18 = Math.min(roadLengthLong, roadDensityModerate)
  z18 = length + 5 * a18
  a19 = Math.min(roadLengthLong, roadDensityDense)
  z19 = length + 5 * a19
  a20 = Math.min(roadLengthLong, roadDensityVeryDense)
  z20 = length + 5 * a20
  a21 = Math.min(roadLengthVeryLong, roadDensityLow)
  z21 = length + 5 * a21
  a22 = Math.min(roadLengthVeryLong, roadDensityLow)
  z22 = length + 5 * a22
  a23 = Math.min(roadLengthVeryLong, roadDensityModerate)
  z23 = length + 5 * a23
  a24 = Math.min(roadLengthVeryLong, roadDensityDense)
  z24 = length + 5 * a24
  a25 = Math.min(roadLengthVeryLong, roadDensityVeryDense)
  z25 = length + 5 * a25
}

function defuzzyfication() {
  return (z1 * a1) + (z2 * a2) + (z3 * a3) + (z4 * a4) + (z5 * a5) + (z6 * a6) + (z7 * a7) + (z8 * a8) + (z9 * a9) + (z10 * a10) + (z11 * a11) + (z12 * a12) + (z13 * a13) + (z14 * a14) + (z15 * a15) + (z16 * a16) + (z17 * a17) + (z18 * a18) + (z19 * a19) + (z20 * a20) + (z21 * a21) + (z22 * a22) + (z23 * a23) + (z24 * a24) + (z25 * a25) / (a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10 + a11 + a12 + a13 + a14 + a15 + a16 + a17 + a18 + a19 + a20 + a21 + a22 + a23 + a24 + a25)
}
