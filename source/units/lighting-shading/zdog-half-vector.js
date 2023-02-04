// Made with Zdog
// {} for namespace
let illo2 = new Zdog.Illustration({
    element: '.zdog-canvas-half-vector',
    dragRotate: false,
  });
let illo3 = new Zdog.Illustration({
  element: '.zdog-canvas-half-vector2',
  dragRotate: false,
});
  
let rgbToString = function(r, g, b) {
  return "rgb("+r.toString() +","+g.toString()+","+b.toString()+")";
}

let hslaToString = function(r, g, b, a) {
  return "hsla("+r.toString() +","+g.toString()+"%,"+b.toString()+"%,"+a+")";
}

// vector maths
let vAdd = (a,b) => ({x:a.x+b.x, y:a.y+b.y});
let vLength = (a) => (Math.sqrt(Math.pow(a.x,2) + Math.pow(a.y, 2)));
let vScalar = (a, s) => ({x: a.x * s, y: a.y * s});
let vSub = (a,b) => vAdd(a, vScalar(b, -1));
let vNormalize = (a) => vScalar(a, 1 / vLength(a));
let vPerpendicular = (a) => (Math.sign(a.x) == Math.sign(a.y) ? {x:a.y, y:-a.x} : {x:-a.y, y:a.x});
let getPathDirection = (angle, radius) => (vScalar({x: Math.sin(angle), y: -Math.cos(angle)}, radius)); // angle is between the ground and the vector
let getPath = (origin, angle, radius) => [origin, vAdd(origin, getPathDirection(angle, radius))];
let p = (x,y) =>  ({x:x, y:y});

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


let getTrianglePoints = function(v, alpha) {
  let arrowHeight = 50 * zoom;
  let arrowWidth = 30 * zoom;

  let x = Math.sin(alpha) * arrowHeight;
  let y = -Math.cos(alpha) * arrowHeight;

  let A = {x: v.x - x, y: v.y - y};
  let B = {x: v.x - x, y: v.y - y};
  let C = v;


  let deltaX = -Math.cos(alpha) * arrowWidth / 2.0;
  let deltaY = -Math.sin(alpha) * arrowWidth / 2.0;

  A = vAdd(A, p(deltaX, deltaY));
  B = vSub(B, p(deltaX, deltaY));

  return [A, B, C];
}


let zoom = 0.5;
// initialize trigonometry parameters-----------------
let alpha0 = -40.0 * Math.PI / 180.0;
let alpha = alpha0;
let l = 430 * zoom; // light ray length
let b = Math.cos(alpha) * l; // normal height
let alpha02 = 70.0 * Math.PI / 180.0;
let alpha2 = alpha02;
let l2 = 550 * zoom; // view ray length
// ---------------------------------------------------

// rgb [14, 223, 241];
let gColor0 = [185, 89, 50];
let gColor = [0, 0, 255];
//TODO: update for specular lighting
let shade = Math.cos(alpha);

let leftBorder = -520 * zoom;
let rightBorder = 520 * zoom;

let startY = 200 * zoom;
let center = 0.5 * (leftBorder + rightBorder);

let origin = {x:center, y: startY};

let groundHeight = 50;
function updateZoom() {
  /*l = 430 * zoom;
  l2 = 550 * zoom;
  leftBorder = -520 * zoom;
  rightBorder = 520 * zoom;

  startY = 200 * zoom;
  center = 0.5 * (leftBorder + rightBorder);

  origin = {x:center, y: startY};

  groundHeight = 100 * zoom;
  ground.path =[
    { x: leftBorder, y: startY + groundHeight, z:1}, // start at 1st point
    { x: leftBorder, y: startY, z:1}, // start at 1st point
    { x:  rightBorder, y: startY, z:1 }, // line to 2nd point
    { x:  rightBorder, y: startY + groundHeight, z:1 }, // line to 2nd point
  ];
  ground.stroke = 10 * zoom;
  ground2.stroke = 10 * zoom;
  ground.updatePath();
  ground2.path = ground.path;
  ground2.updatePath();
  normal.path = getPath(origin, 0, 220);
  normal.stroke = 10 * zoom;
  normal.updatePath();
  normalTip.path = getTrianglePoints(vAdd(normal.path[1], getPathDirection(0, 10)), 0);
  normalTip.stroke = 5 * zoom;
  normalTip.updatePath();*/
}
// constant shapes (aside from color)
let ground  = new Zdog.Shape({
  addTo: illo2,
  path: [
    { x: leftBorder, y: startY + groundHeight, z:1}, // start at 1st point
    { x: leftBorder, y: startY, z:1}, // start at 1st point
    { x:  rightBorder, y: startY, z:1 }, // line to 2nd point
    { x:  rightBorder, y: startY + groundHeight, z:1 }, // line to 2nd point
  ],
  stroke: 10 * zoom,
  closed: false,
  color: hslaToString(gColor[0],gColor[1],gColor[2]*shade, 1.0),
});


let canvasCoordinates = function(x,y, name = "zdog-canvas-half-vector") {
  let canvasRect = document.getElementsByClassName(name)[0].getBoundingClientRect();
  console.log(canvasRect.width);
  let height = canvasRect.height;
  let width = canvasRect.width;
  return {x: (x-canvasRect.x - width/2.0), y:-( y-canvasRect.y-height/2.0) + startY};
};
let htmlCoordinates = function(x,y, name = "zdog-canvas-half-vector") {
  let canvasRect = document.getElementsByClassName(name)[0].getBoundingClientRect();
  let height = canvasRect.height;
  let width = canvasRect.width;
  return {x: x* width / 760 + width/2.0, y:(-y + startY) * width / 760 + height/2.0 };
};

let ground2 = ground.copy({
  fill:true,
  color: "hsla(0,0%,80%,0.18)",});
let normal  = new Zdog.Shape({
  addTo: illo2,
  path: getPath(origin, 0, 220),
  stroke: 10 * zoom,
  color: hslaToString(gColor[0],gColor[1],gColor[2]*shade, 1.0),
});
let normalTip  = new Zdog.Shape({
  addTo: illo2,
  path: getTrianglePoints(vAdd(normal.path[1], getPathDirection(0, 10)), 0),
  stroke: 5*zoom,
  color: hslaToString(gColor[0],gColor[1],gColor[2]*shade, 1.0),
  fill: true
});
  

// directly modified by angle
let lightLine = new Zdog.Shape({
  addTo: illo2,
  stroke: 5 * zoom,
  translate: {z:1},
});
let lightTriangle = new Zdog.Shape({
  addTo: illo2,
  stroke: 0,
  translate:{z:1},
  fill: true
});

// reflection light ray
let reflectionLine = lightLine.copy();
let reflectionTriangle = lightTriangle.copy();
// view light ray
let viewLine = lightLine.copy();
let viewTriangle = lightTriangle.copy();
// halfVector ray
let halfVectorLine = lightLine.copy({addTo:illo3});
let halfVectorTriangle = lightTriangle.copy({addTo:illo3});

let arc = lightLine.copy({closed: false, translate:{z:-1}, color:hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0)});
let arc2 = lightLine.copy({closed: false, translate:{z:-1}, color:hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0)});
let arcView = lightLine.copy({closed: false, translate:{z:-1}, color: hslaToString(gColor[0],gColor[1],gColor[2], 1.0)});


// color initialization
let lineColor = () => [255, 15, 200];
let lineColor2 = () => [14, 223, 241];
let magenta = lineColor();
let cyan = lineColor2();
let magentaString = rgbToString(magenta[0], magenta[1], magenta[2]);
let cyanString = rgbToString(cyan[0], cyan[1], cyan[2]);

lightLine.color = magentaString;
lightTriangle.color = magentaString;
reflectionLine.color = magentaString;
reflectionTriangle.color = magentaString;
viewLine.color = cyanString;
viewTriangle.color = cyanString;
halfVectorLine.color = hslaToString(gColor0[0],gColor0[1],gColor0[2]*0.37, 1.0);
halfVectorTriangle.color = hslaToString(gColor0[0],gColor0[1],gColor0[2]*0.37, 1.0);


// create second illustration----------------------------

// TODO: find out how to do this right
normal.copy({addTo: illo3});
normalTip.copy({addTo: illo3});
let groundH = ground.copy({addTo: illo3});
ground2.copy({addTo: illo3});
let lightLineH = lightLine.copy({addTo: illo3});
let lightTriangleH = lightTriangle.copy({addTo: illo3});
//let reflectionLineH = reflectionLine.copy({addTo: illo3});
//let reflectionTriangleH = reflectionTriangle.copy({addTo: illo3});
let viewLineH = viewLine.copy({addTo: illo3});
let viewTriangleH = viewTriangle.copy({addTo: illo3});

let arcH = arc.copy({addTo: illo3});
//let arc2H = arc2.copy({addTo: illo3});

let arcViewH = arcView.copy({addTo: illo3});
// --------------------------------------------------------

let updateLightLine = function(line = lightLine, triangle = lightTriangle) {
  line.path = getPath(origin, alpha, l);
  line.updatePath();

  triangle.path = getTrianglePoints(vAdd(line.path[1], getPathDirection(alpha, 10)), alpha);
  triangle.updatePath();
};
let updateReflectionLine = function(line = reflectionLine, triangle = reflectionTriangle) {
  line.path = getPath(origin, - alpha, l);
  line.updatePath();

  triangle.path = getTrianglePoints(vAdd(line.path[1], getPathDirection(-alpha, 10)), -alpha);
  triangle.updatePath();
};
let updateViewLine = function(line = viewLine, triangle = viewTriangle) {
  line.path = getPath(origin, alpha2, l2)
  line.updatePath();

  triangle.path = getTrianglePoints(vAdd(viewLine.path[1], getPathDirection(alpha2, 10)), alpha2);
  triangle.updatePath();
}
let updatehalfVectorLine = function(line = lightLine, triangle = lightTriangle) {
  let halfAngle = (alpha + alpha2) / 2.0;
  halfVectorLine.path = getPath(origin, halfAngle, l)
  halfVectorLine.updatePath();

  halfVectorTriangle.path = getTrianglePoints(vAdd(halfVectorLine.path[1], getPathDirection(halfAngle, 10)), halfAngle);
  halfVectorTriangle.updatePath();
}

let updateLines = function() {
  updateLightLine();
  updateLightLine(lightLineH, lightTriangleH);
  updateReflectionLine();
  //updateReflectionLine(reflectionLineH, reflectionTriangleH);
  updateViewLine();
  updateViewLine(viewLineH, viewTriangleH);
  updatehalfVectorLine();
}
updateLines();

let getMirroredArc = function(path) {
  let p1 = path[0];
  let c1 = path[1].bezier[0];
  let c2 = path[1].bezier[1];
  let p2 = path[1].bezier[2];

  c1.x *= -1;
  c2.x *= -1;
  p2.x *= -1;
  return [p1, {bezier: [c1, c2, p2]}];
}

let getArcFromStuff = function(alpha1, alpha2, origin, radius, mirrored = false) {
  let part = 1.6;
  let point1 = vAdd(origin, getPathDirection(alpha1, radius));//vAdd(origin, p(0, -radius));
  let point2 = vAdd(origin, getPathDirection(alpha2, radius));

  let alphaDifference = Math.abs(alpha1 - alpha2);
  let middlePointRadius = radius / Math.cos(alphaDifference / 2.0);
  let middleAlpha = 0.5 * (alpha1 + alpha2);
  let middlePoint = vAdd(origin, getPathDirection(middleAlpha, middlePointRadius));

  let vector1 = vScalar(vSub(middlePoint, point1), 1.0/part);
  let vector2 = vScalar(vSub(middlePoint, point2), 1.0/part)

  let controlPoint1 = vAdd(point1, vector1);
  let controlPoint2 = vAdd(point2, vector2);

  let path = [point1, {bezier:[controlPoint1,controlPoint2,point2]}];
  return mirrored ? getMirroredArc(path) : path;
}

function getArcFromStuffWithMiddlePoint(alpha1, alpha2, origin, radius, mirrored = false) {
  let firstArc, secondArc;
  if(Math.abs(alpha2-alpha1) > Math.PI / 3.0) {
    firstArc = getArcFromStuffWithMiddlePoint(alpha1, (alpha1 + alpha2)/2.0, origin, radius, mirrored);
    secondArc = getArcFromStuffWithMiddlePoint((alpha1 + alpha2)/2.0, alpha2, origin, radius, mirrored);
  } else {
    firstArc = getArcFromStuff(alpha1, (alpha1 + alpha2)/2.0, origin, radius, mirrored);
    secondArc = getArcFromStuff((alpha1 + alpha2)/2.0, alpha2, origin, radius, mirrored);
  }
  return firstArc.concat(secondArc);
}
  let radiusView = 280 * zoom;
  let radius = 240;
let updateBezierControlPoints = function() {

  arc.path = getArcFromStuffWithMiddlePoint(0, alpha, p(center, startY), radius * 0.5);
  arc2.path = getArcFromStuffWithMiddlePoint(0, -alpha, p(center, startY), radius * 0.5);
  arcView.path =  getArcFromStuffWithMiddlePoint(alpha2, -alpha,p(center, startY), radiusView, false);
  arcH.path = arc.path;
  //arc2H.path = arc2.path;
  arcViewH.path = getArcFromStuffWithMiddlePoint(0, (alpha2 + alpha)/2.0,p(center, startY), radiusView, false);
  arc.updatePath();
  arc2.updatePath();
  arcView.updatePath();
  arcH.updatePath();
  //arc2H.updatePath();
  arcViewH.updatePath();
}
updateBezierControlPoints();

let leftSide = false;
let angleDifference;
let movedRay = 0;

let applyLabelCoordinates = function(label, position, name = "zdog-canvas-half-vector") {
  let coords = htmlCoordinates(position.x, -position.y, name);
  label.style.left = (coords.x -label.offsetWidth/2.0)+ "px";
  label.style.top = (coords.y -label.offsetHeight/2.0) + "px";

}
let thetaLabel = document.getElementById("theta");
let thetaLabel2 = thetaLabel.cloneNode(true);
document.getElementById('canvasContainer').appendChild(thetaLabel2);

let alphaLabel = document.getElementById("alpha");
let normalLabel = document.getElementById("normal");
let lightLabel = document.getElementById("light");
let reflectionLabel = document.getElementById("reflection");
let viewLabel = document.getElementById("view");
let alphaValueLabel = document.getElementById("alphaValue");
let alphaValueContainer = document.getElementById("alphaLabel");

let thetaLabel_2 = document.getElementById("theta2");
//let thetaLabel2_2 = thetaLabel.cloneNode(true);
//document.getElementById('canvasHalfVectorContainer').appendChild(thetaLabel2_2);

let alphaLabel2 = document.getElementById("alpha2");
let normalLabel2 = document.getElementById("normal2");
let lightLabel2 = document.getElementById("light2");
//let reflectionLabel2 = document.getElementById("reflection2");
let viewLabel2 = document.getElementById("view2");
let alphaValueLabelH = document.getElementById("alphaValue2");
let alphaValueContainerH = document.getElementById("alphaLabel2");
let halfLabelH = document.getElementById("halfVector");


let updateLabels = function() {
  let origin = p(0,0);
  let path = getPath(origin, alpha / 2.0, radius * 0.5 / 1.5);
  let path2 = getPath(origin, -alpha / 2.0, radius * 0.5 / 1.5);
  let path3 = getPath(origin, (alpha2 - alpha) / 2.0, radiusView / 1.5);
  let pathL = getPath(origin, alpha, l + 30);
  let pathR = getPath(origin, -alpha, l + 30);
  let pathV = getPath(origin, alpha2, l2 + 30);

  let pathHalfAlpha = getPath(origin,(alpha + alpha2) / 4.0, (l + radiusView) / 2.0);
  let pathHalfAlpha2 = getPath(origin,(alpha + alpha2) / 2.0, l + 15 / zoom);

  applyLabelCoordinates(thetaLabel, path[1]);
  applyLabelCoordinates(thetaLabel2, path2[1]);
  applyLabelCoordinates(alphaLabel, path3[1]);
  applyLabelCoordinates(lightLabel, pathL[1]);
  applyLabelCoordinates(reflectionLabel, pathR[1]);
  applyLabelCoordinates(viewLabel, pathV[1]);


  applyLabelCoordinates(thetaLabel_2, path[1]);
  //applyLabelCoordinates(thetaLabel2_2, path2[1]);
  applyLabelCoordinates(alphaLabel2, pathHalfAlpha[1]);
  applyLabelCoordinates(lightLabel2, pathL[1]);
  //applyLabelCoordinates(reflectionLabel2, pathR[1]);
  applyLabelCoordinates(viewLabel2, pathV[1]);
  applyLabelCoordinates(halfLabelH, pathHalfAlpha2[1]);

  applyLabelCoordinates(normalLabel, p(0, -250));
  applyLabelCoordinates(normalLabel2, p(0, -250), name = "zdog-canvas-half-vector2");

  applyLabelCoordinates(alphaValueContainer, p(rightBorder / 2.0, groundHeight/2.0));
  applyLabelCoordinates(alphaValueContainerH, p(rightBorder / 2.0, groundHeight/2.0, name = "zdog-canvas-half-vector2"));
  
  let shownAlphaValue = (alpha + alpha2) * 180 / Math.PI;
  shownAlphaValue = Math.abs(Math.round(shownAlphaValue));
  alphaValueLabel.innerHTML = shownAlphaValue;
  document.getElementById("alphaValue2").innerHTML = shownAlphaValue / 2.0;
};
updateLabels();

let lightingIndicator = new Zdog.Ellipse({
  addTo: illo2,
  diameter: 40,
  stroke:2,
  fill: true,
  translate: {x: -300, y: -100},
  color: '#fff',
});
let lightingIndicatorH = lightingIndicator.copy({addTo: illo3});

let updateLightingFor = function(angle = alpha2 + alpha, indicator = lightingIndicator, g = ground) {
  let specularExponent = 16;
  let diffuse = Math.cos(alpha);
  let specular = Math.pow(clamp(Math.cos(angle),0.0,1.0), specularExponent);
  shade = diffuse*0.1 + specular;
  shade /= 1.1;
  g.color = hslaToString(gColor[0], gColor[1], gColor[2] * shade, 1.0);
  indicator.color = hslaToString(gColor[0], gColor[1], gColor[2] * shade, 1.0);
}
let updateLighting = function() {
  updateLightingFor();
  updateLightingFor((alpha2 + alpha) / 2.0, lightingIndicatorH, groundH);
};
updateLighting();

let dragStart = function(pointer, illustration) {
  let coords = canvasCoordinates(pointer.x, pointer.y, "zdog-canvas-half-vector" + (illustration == 0 ? "" : "2"));
  leftSide = (coords.x < 0.0);
  // TODO: refactor this abomination
  let angle = Math.atan(coords.x / coords.y);
  let angleLight = alpha;
  let angleReflect = -alpha;
  let angleView = alpha2;
  /* debug statements in case everything breaks again
  console.log("angle 1");
  console.log(angleLight);
  console.log("angle 2");
  console.log(angleReflect);
  console.log("angle 3");
  console.log(angleView);
  console.log(angle);*/
  let angleDifference1 = angle-angleLight;
  let angleDifference2 = angle-angleReflect;
  let angleDifference3 = angle-angleView;
  if(Math.abs(angleDifference1) < Math.abs(angleDifference2)) {
    if(Math.abs(angleDifference1) < Math.abs(angleDifference3)) {
      angleDifference = angleDifference1;
      movedRay = 0;
    } else {
      angleDifference = angleDifference3;
      movedRay = 2;
    }
  } else if(Math.abs(angleDifference3) < Math.abs(angleDifference2)) {
    angleDifference = angleDifference3;
    movedRay = 2;
  } else {
    angleDifference = illustration == 0 ? angleDifference2 : angleDifference3;
    movedRay = illustration == 0 ? 1 : 2;
  }

  // TODO: handle transparency differently (e.g. make non-moved rays transparent)
  //arc2.color = hslaToString(gColor0[0],gColor0[1],gColor0[2], 0.5);
  //reflectionLine.color = rgbToString(magenta[0] * 0.5, magenta[1] * 0.5, magenta[2] * 0.5);
  //reflectionTriangle.color = rgbToString(magenta[0] * 0.5, magenta[1] * 0.5, magenta[2] * 0.5);
}

let dragMove = function(pointer, illustration) {
  let coords = canvasCoordinates(pointer.x, pointer.y, "zdog-canvas-half-vector" + (illustration == 0 ? "" : "2"));
  let angle = Math.atan(coords.x / coords.y);
  // TODO for if I have time some day: determine the quadrant the angle is in to correctly find angles for y < 0
  if(coords.y < 0) return;
  if(movedRay == 0) {
    alpha = (angle - angleDifference);
    alpha = clamp(alpha, -0.5*Math.PI+0.1, -0.1);
  } else if (movedRay == 1) {
    alpha =  -(angle - angleDifference);
    alpha = clamp(alpha, -0.5*Math.PI+0.1, -0.1);
  } else {
    alpha2 = (angle - angleDifference);
    alpha2 = clamp(alpha2, -0.5*Math.PI+0.1, 0.5*Math.PI-0.1);

  }
  
  updateLines();
  
  updateBezierControlPoints();

  updateLabels();
  updateLighting();

}

let dragEnd = function() {
  alpha0 = alpha;
  alpha02 = alpha2;

  arc2.color = hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0);
  reflectionLine.color = rgbToString(magenta[0], magenta[1], magenta[2]);
  reflectionTriangle.color = rgbToString(magenta[0] , magenta[1] , magenta[2]);

}
let dragger = new Zdog.Dragger({
  startElement:illo2.element,
  onDragStart:function(pointer){
    dragStart(pointer, 0);
  },
  onDragMove:function(pointer, moveX, moveY) {
    dragMove(pointer, 0)
  },
  onDragEnd:function(){
    dragEnd();
  }
});

let dragger2 =  new Zdog.Dragger({
  startElement:illo3.element,
  onDragStart:function(pointer){
    dragStart(pointer, 1);
  },
  onDragMove:function(pointer, moveX, moveY) {
    dragMove(pointer, 1)
  },
  onDragEnd:function(){
    dragEnd();
  }
});

// https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
function getCoords(elem) { // crossbrowser version
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top  = box.top +  scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

function animate() {
  illo2.updateRenderGraph();
  illo3.updateRenderGraph();
  let left = getCoords(document.getElementById("zdog-canvas-half-vector")).left;
  let actualWidth = Math.max(Math.min(window.innerWidth - left, 760), 0);
  document.getElementById("zdog-canvas-half-vector").style["width"] = actualWidth + "px";
  document.getElementById("zdog-canvas-half-vector2").style["width"] = actualWidth + "px";
  zoom = 0.5 * actualWidth / 760;
  let actualHeight = actualWidth / 760 * 340;
  document.getElementById("zdog-canvas-half-vector").style["height"] = actualHeight + "px";
  document.getElementById("zdog-canvas-half-vector2").style["height"] = actualHeight + "px";
  updateZoom();

  updateLines();
  updateBezierControlPoints();
  updateLabels();
  updateLighting();
  requestAnimationFrame( animate );
}

animate();


