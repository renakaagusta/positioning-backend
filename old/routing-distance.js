var graph = new DirectedGraph()
var INFINITY = 1 / 0
var x_path = []
var totalShortestPathWeight = 0

var length,
  density = 0
var roadLengthVeryShort = 0,
  roadLengthShort = 0,
  roadLengthModerate = 0,
  roadLengthLong = 0,
  roadLengthVeryLong = 0
var roadDensityLow = 0,
  roadDensityLow = 0,
  roadDensityModerate = 0,
  roadDensityHigh = 0,
  roadDensityVeryHigh = 0
var a1 = 0,
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
  a20 = 0
  a21 = 0,
  a22 = 0,
  a23 = 0,
  a24 = 0,
  a25 = 0
var z1 = 0,
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
  z25 = 0,
var calculatedData = []

var length = 0,
  density = 0
  
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
  var distance = 0
  
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

  calculatedData.push([from, to, distance])

  
  return distance
}

