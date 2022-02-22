var graph = new DirectedGraph()
var INFINITY = 1 / 0
var x_path = []
var totalShortestPathWeight = 0

var length,
  density = 0
var roadLengthShort = 0,
  roadLengthModerate = 0,
  roadLengthLong = 0;
var roadDensityLow = 0,
  roadDensityModerate = 0,
  roadDensityDense = 0;
var a1 = 0,
  a2 = 0,
  a3 = 0,
  a4 = 0,
  a5 = 0,
  a6 = 0,
  a7 = 0,
  a8 = 0,
  a9 = 0;
var z1 = 0,
  z2 = 0,
  z3 = 0,
  z4 = 0,
  z5 = 0,
  z6 = 0,
  z7 = 0,
  z8 = 0,
  z9 = 0
var calculatedData = []

function route_setup() {
  var starting_point = parseInt(document.getElementById('starting_point').value)
  var end_point = parseInt(document.getElementById('end_point').value)

  var out = djikstra(graph, String(starting_point))

  let points = []

  for (i = 0; i < data.features.length; i++) {
    for (j = 0; j < out.shortestPaths[end_point].length; j++) {
      if (String(i) == out.shortestPaths[end_point][j]) {
        var x_i = i
        x_path.push({
          lat: data.features[x_i].geometry.coordinates[1],
          lng: data.features[x_i].geometry.coordinates[0]
        })

        points.push(x_i)
      }
    }
  }
  x_path.push({
    lat: data.features[end_point].geometry.coordinates[1],
    lng: data.features[end_point].geometry.coordinates[0]
  })
  points.forEach((point, index) => {
    if(points[index+1]) {
      if (graph.vertices[point][(points[index + 1])] && points[index+1]) {
        totalShortestPathWeight += graph.vertices[point][(points[index + 1])]
      }
    }
  })

  return x_path
}

function DirectedGraph() {
  this.vertices = {}
  this.addVertex = async function (name, edges) {
    edges = edges || null
    this.vertices[name] = edges
  }
}

function djikstra(graph, startVertex) {
  var dist = {}
  var prev = {}
  var q = {}
  var shortestPaths = {}

  for (var vertex in graph.vertices) {
    dist[vertex] = INFINITY
    prev[vertex] = null
    q[vertex] = graph.vertices[vertex]
    shortestPaths[vertex] = []
  }
  dist[startVertex] = 0

  while (Object.keys(q).length !== 0) {
    var smallest = findSmallest(dist, q)
    var smallestNode = graph.vertices[smallest]
    for (var neighbor in smallestNode) {
      var alt = dist[smallest] + smallestNode[neighbor]
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

function findSmallest(dist, q) {
  var min = Infinity
  var minNode
  for (var node in q) {
    if (dist[node] <= min) {
      min = dist[node]
      minNode = node
    }
  }

  delete q[minNode]
  return minNode
}

function getShortestPaths(previous, shortestPaths, startVertex, dist) {
  for (var node in shortestPaths) {
    var path = shortestPaths[node]

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

Number.prototype.toRad = function () {
  return (this * Math.PI) / 180
}

async function weight(a, b, from, to) {
  const service = new google.maps.DistanceMatrixService()
  const request = {
    origins: [{ lat: a[1], lng: a[0] }],
    destinations: [{ lat: b[1], lng: b[0] }],
    travelMode: google.maps.TravelMode.DRIVING,
    drivingOptions: {
      departureTime: new Date(Date.now()),
      trafficModel: 'optimistic'
    }
  }
  var distance = 0
  var trafficLevel = 0
  
  await service.getDistanceMatrix(request).then(response => {
    var R = 6371
    var x1 = b[1] - a[1]
    var dLat = x1.toRad()
    var x2 = b[0] - a[0]
    var dLon = x2.toRad()
    var c =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(a[1].toRad()) *
      Math.cos(b[1].toRad()) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    var d = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c))
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
  })
  console.log(from+"-"+to)
  console.log("roadLengthShort")
  console.log(roadLengthShort)
  console.log("roadLengthModerate")
  console.log(roadLengthModerate)
  console.log("roadLengthLong")
  console.log(roadLengthLong)
  console.log("roadDensityShort")
  console.log(roadDensityLow)
  console.log("roadDensityModerate")
  console.log(roadDensityModerate)
  console.log("roadDensityLong")
  console.log(roadDensityDense)
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
  if(isNaN(defuzzyfication())) {
    return 0
  } else {
    return defuzzyfication()
  }
}

function calcRoadLengthShort() {
  if (length < 80) {
    roadLengthShort = 1
  } else if (length >= 80 && length < 120) { 
    roadLengthShort = (120 - length) / (120 - 80)
  } else if (length >= 120) { 
    roadLengthShort = 0
  }
}

function calcRoadLengthModerate() {
  if (length >= 80 && length < 120) {
    roadLengthModerate = (120 - length) / (120 - 80)
  } else if (length >= 120 && length < 180) {
    roadLengthModerate = 1
  } else if (length >= 180 && length < 220) {
    roadLengthModerate = (220 - length) / (220 - 180)
  }
}

function calcRoadLengthLong() {
  if (length >= 180 && length < 220) {
    roadLengthLong = (220 - length) / (220 - 180)
  }  else if (length >= 220) {
    roadLengthLong = 1
  }
}

function calcRoadDensityLow() {
  if (density < 0.2) {
    roadDensityLow = 1
  } else if (density >= 0.2 && density < 0.4) {
    roadDensityLow = (0.4 - density) / (0.4 - 0.2)
  } else if (density >= 0.4) {
    roadDensityLow = 0
  }
}

function calcRoadDensityModerate() {
  if (density >= 0.2 && density < 0.4) {
    roadDensityModerate = (0.4 - density) / (0.4 - 0.2)
  } else if (density >= 0.4 && density < 0.5 ) {
    roadDensityModerate = 1
  } else if (density >= 0.5  && density < 0.7 ) {
    roadDensityModerate = (0.7  - density) / (0.7  - 0.5 )
  }
}

function calcRoadDensityDense() {
  if (density >= 0.5  && density < 0.7 ) {
    roadDensityDense = (0.5  - density) / (0.7  - 0.5 )
  } else if (density >= 0.7  ) {
    roadDensityDense = 1
  }
}


function fuzzyfication() {
  calcRoadDensityDense()
  calcRoadDensityModerate()
  calcRoadDensityLow() 
  calcRoadLengthLong()
  calcRoadLengthModerate()
  calcRoadLengthShort()
}

function rules() {
  fuzzyfication()
  a1 = Math.min(roadLengthShort, roadDensityLow)
  z1 = length + 5 * a1
  a2 = Math.min(roadLengthShort, roadDensityModerate)
  z2 = length + 5 * a2
  a3 = Math.min(roadLengthShort, roadDensityDense)
  z3 = length + 5 * a3
  a4 = Math.min(roadLengthModerate, roadDensityLow)
  z4 = length + 5 * a4
  a5 = Math.min(roadLengthModerate, roadDensityModerate)
  z5 = length + 5 * a5
  a6 = Math.min(roadLengthModerate, roadDensityDense)
  z6 = length + 5 * a6
  a7 = Math.min(roadLengthLong, roadDensityLow)
  z7 = length + 5 * a7
  a8 = Math.min(roadLengthLong, roadDensityModerate)
  z8 = length + 5 * a8
  a9 = Math.min(roadLengthLong, roadDensityDense)
  z9 = length + 5 * a9
}

function defuzzyfication() {
  return (z1 * a1) + (z2 * a2) + (z3 * a3) + (z4 * a4) + (z5 * a5) + (z6 * a6) + (z7 * a7) + (z8 * a8) + (z9 * a9) / (a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9)
}
