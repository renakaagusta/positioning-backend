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
  console.log("roadLengthVeryShort")
  console.log(roadLengthVeryShort)
  console.log("roadLengthShort")
  console.log(roadLengthShort)
  console.log("roadLengthModerate")
  console.log(roadLengthModerate)
  console.log("roadLengthLong")
  console.log(roadLengthLong)
  console.log("roadLengthVeryShort")
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
  console.log("defuzzy")
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
