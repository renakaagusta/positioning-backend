var graph = new DirectedGraph()
var INFINITY = 1 / 0
var x_path = []
var totalShortestPathWeight = 0


var calculatedData = []
let points = []

function route_setup() {
  var startingPoint = parseInt(document.getElementById('startingPoint').value)
  var endPoint = parseInt(document.getElementById('endPoint').value)

  var out = djikstra(graph, String(startingPoint))


  for (i = 0; i < data.features.length; i++) {
    for (j = 0; j < out.shortestPaths[endPoint].length; j++) {
      if (String(i) == out.shortestPaths[endPoint][j]) {
        var x_i = i
        console.log("path")
        console.log(data.features[x_i].geometry.coordinates[0])
        x_path.push({
          lat: data.features[x_i].geometry.coordinates[1],
          lng: data.features[x_i].geometry.coordinates[0]
        })

        points.push(x_i)
      }
    }
  }
  x_path.push({
    lat: data.features[endPoint].geometry.coordinates[1],
    lng: data.features[endPoint].geometry.coordinates[0]
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
