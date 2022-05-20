// Made with Zdog
// {} for namespace
let illo2 = new Zdog.Illustration({
    element: '.zdog-canvas-half-vector',
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


let canvasCoordinates = function(x,y) {
  let canvasRect = document.getElementsByClassName("zdog-canvas-half-vector")[0].getBoundingClientRect();
  let height = canvasRect.height;
  let width = canvasRect.width;
  return{x: (x-canvasRect.x - width/2.0), y:-( y-canvasRect.y-height/2.0) + startY};
};
let htmlCoordinates = function(x,y) {
  let canvasRect = document.getElementsByClassName("zdog-canvas-half-vector")[0].getBoundingClientRect();
  let height = canvasRect.height;
  let width = canvasRect.width;
  return{x: (x + width/2.0), y:-y + startY+ height/2.0 };
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

let updateLightLine = function() {
  lightLine.path = getPath(origin, alpha, l);
  lightLine.updatePath();

  lightTriangle.path = getTrianglePoints(vAdd(lightLine.path[1], getPathDirection(alpha, 10)), alpha);
  lightTriangle.updatePath();
};
let updateReflectionLine = function() {
  reflectionLine.path = getPath(origin, - alpha, l);
  reflectionLine.updatePath();

  reflectionTriangle.path = getTrianglePoints(vAdd(reflectionLine.path[1], getPathDirection(-alpha, 10)), -alpha);
  reflectionTriangle.updatePath();
};
let updateViewLine = function() {
  viewLine.path = getPath(origin, alpha2, l2)
  viewLine.updatePath();

  viewTriangle.path = getTrianglePoints(vAdd(viewLine.path[1], getPathDirection(alpha2, 10)), alpha2);
  viewTriangle.updatePath();
}

updateLightLine();
updateReflectionLine();
updateViewLine();

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

let arc = lightLine.copy({closed: false, color:hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0)});
let arc2 = lightLine.copy({closed: false, color:hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0)});
let arcView = lightLine.copy({closed: false, color: hslaToString(gColor[0],gColor[1],gColor[2], 1.0)});

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
let getArcFromStuff0 = function(alpha, center, startY, radius, mirrored = false) {
  let part = 1.7;
  let point1 = {x:center , y:startY-radius};
  let point2 = {x:center - Math.sin(Math.PI/2.0-alpha) * radius , y:startY - Math.cos(Math.PI/2.0 - alpha) * radius};
  let middlePoint = {x:center - Math.tan(Math.PI/4.0 - alpha/2.0) * radius , y:startY - radius};

  let vector1 = {x:(middlePoint.x - point1.x) / part, y:(middlePoint.y - point1.y)/part};
  let vector2 = {x:(middlePoint.x - point2.x) / part, y:(middlePoint.y - point2.y)/part};

  let controlPoint1 = vAdd(point1, vector1);
  let controlPoint2 = vAdd(point2, vector2);

  let path = [point1, {bezier:[controlPoint1,controlPoint2,point2]}];
  return mirrored ? getMirroredArc(path) : path;
}
let getArcFromStuff = function(alpha1, alpha2, origin, radius, mirrored = false) {
  let part = 1.7;
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
  let radiusView = 280;
  let radius = 240;
let updateBezierControlPoints = function() {

  arc.path = getArcFromStuff(0, alpha, p(center, startY), radius * zoom);
  arc2.path = getMirroredArc(JSON.parse(JSON.stringify(arc.path)));
  arcView.path =  getArcFromStuff(alpha2, -alpha,p(center, startY), radiusView * zoom, false);
  arc.updatePath();
  arc2.updatePath();
  arcView.updatePath();
}
updateBezierControlPoints();

let leftSide = false;
let angleDifference;
let movedRay = 0;

let applyLabelCoordinates = function(label, position) {
  let coords = htmlCoordinates(position.x, -position.y + startY);
  label.style.left = (coords.x -label.offsetWidth/2.0)+ "px";
  label.style.top = (coords.y -label.offsetHeight/2.0) + "px";

}
let thetaLabel = document.getElementById("theta");
let thetaLabel2 = theta.cloneNode(true);
document.getElementById('canvasContainer').appendChild(thetaLabel2);

let alphaLabel = document.getElementById("alpha");
let normalLabel = document.getElementById("normal");
let lightLabel = document.getElementById("light");
let reflectionLabel = document.getElementById("reflection");
let viewLabel = document.getElementById("view");

//let normalCoordinates = htmlCoordinates(path3[1].x, -path3[1].y + startY);
applyLabelCoordinates(normalLabel, p(0, startY - 250));

let updateLabels = function() {
  let path = getPath(origin, alpha / 2.0, radius * zoom / 1.5);
  let path2 = getPath(origin, -alpha / 2.0, radius * zoom / 1.5);
  let path3 = getPath(origin, (alpha2 - alpha) / 2.0, radiusView * zoom / 1.5);
  let pathL = getPath(origin, alpha, l + 30);
  let pathR = getPath(origin, -alpha, l + 30);
  let pathV = getPath(origin, alpha2, l2 + 30);

  applyLabelCoordinates(thetaLabel, path[1]);
  applyLabelCoordinates(thetaLabel2, path2[1]);
  applyLabelCoordinates(alphaLabel, path3[1]);
  applyLabelCoordinates(lightLabel, pathL[1]);
  applyLabelCoordinates(reflectionLabel, pathR[1]);
  applyLabelCoordinates(viewLabel, pathV[1]);
};
updateLabels();
new Zdog.Dragger({
  startElement:illo2.element,
  onDragStart:function(pointer){
    let coords = canvasCoordinates(pointer.x, pointer.y);
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
      angleDifference = angleDifference2;
      movedRay = 1;
    }
    arc2.color = hslaToString(gColor0[0],gColor0[1],gColor0[2], 0.5);
    reflectionLine.color = rgbToString(magenta[0] * 0.5, magenta[1] * 0.5, magenta[2] * 0.5);
    reflectionTriangle.color = rgbToString(magenta[0] * 0.5, magenta[1] * 0.5, magenta[2] * 0.5);
  },
  onDragMove:function(pointer, moveX, moveY) {
    let coords = canvasCoordinates(pointer.x, pointer.y);
    let angle = Math.atan(coords.x / coords.y);
    // TODO for if I have time some day: determine the quadrant the angle is in to correctly find angles for y < 0
    if(coords.y < 0) return;
    if(movedRay == 0) {
      alpha = (angle - angleDifference);
      alpha = clamp(alpha, -0.5*Math.PI+0.2, -0.2);
    } else if (movedRay == 1) {
      alpha =  -(angle - angleDifference);
      alpha = clamp(alpha, -0.5*Math.PI+0.2, -0.2);
    } else {
      alpha2 = (angle - angleDifference);
      alpha2 = clamp(alpha2, 0.2, 0.5*Math.PI-0.2);

    }
    //calculateLightRayParameters();
    
    updateLightLine();
    updateReflectionLine();
    updateViewLine();
    
    updateBezierControlPoints();

    updateLabels();

    shade = Math.cos(Math.PI / 2.0 - alpha);
    ground.color = hslaToString(gColor[0], gColor[1], gColor[2] * shade, 1.0);
  },
  onDragEnd:function(){
    alpha0 = alpha;
    alpha02 = alpha2;

    arc2.color = hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0);
    reflectionLine.color = rgbToString(magenta[0], magenta[1], magenta[2]);
    reflectionTriangle.color = rgbToString(magenta[0] , magenta[1] , magenta[2]);
  }
});
illo2.zoom = 0.5;
function animate() {
  illo2.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();

