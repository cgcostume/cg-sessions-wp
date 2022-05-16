// Made with Zdog
// {} for namespace
{
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

let getTrianglePoints = function(x, y, alpha) {
  let arrowHeight = 50;
  let arrowWidth = 30;

  let o = Math.sin(alpha) * arrowHeight;
  let p = Math.cos(alpha) * arrowHeight;

  let A = {x: x - p, y: y - o};
  let B = {x: x - p, y: y - o};
  let C = {x: x, y: y};

  let beta = Math.PI / 2.0 - alpha;

  let i = Math.cos(beta) * arrowWidth / 2.0;
  let j = Math.sin(beta) * arrowWidth / 2.0;

  A.x -= i;
  A.y += j;

  B.x += i;
  B.y -= j;

  return [A, B, C];
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// initialize trigonometry parameters-----------------
let alpha0 = 70.0 * Math.PI / 180.0;
let alpha = alpha0;
let l = 500; // light ray length
let b = Math.sin(alpha) * l; // height of light rays
let c = b / Math.tan(alpha);
let alpha02 = 20.0 * Math.PI / 180.0;
let alpha2 = alpha02;
let l2 = 600; // view ray length
let b2 = Math.sin(alpha2) * l2; // height of view ray
let c2 = b2 / Math.tan(alpha2);
// ---------------------------------------------------

// update trigonometry parameters for new alpha-------
let calculateLightRayParameters = function() {
  b = Math.sin(alpha) * l; // height of light rays
  c = b / Math.tan(alpha); 
  b2 = Math.sin(alpha2) * l2; // height of light rays
  c2 = b2 / Math.tan(alpha2); 
}

// rgb [14, 223, 241];
let gColor0 = [185, 89, 50];
let gColor = [0, 0, 255];
let shade = Math.cos(Math.PI / 2.0 - alpha);

let leftBorder = -520;
let rightBorder = 520;

// constant shapes (aside from color)
let ground  = new Zdog.Shape({
  addTo: illo2,
  path: [
    { x: leftBorder, y: 300, z:1}, // start at 1st point
    { x: leftBorder, y: 200, z:1}, // start at 1st point
    { x:  rightBorder, y: 200, z:1 }, // line to 2nd point
    { x:  rightBorder, y: 300, z:1 }, // line to 2nd point
  ],
  stroke: 10,
  closed: false,
  color: hslaToString(gColor[0],gColor[1],gColor[2]*shade, 1.0),
});

let startX = -0;
let startY = 200;
let fadeRange = 50;

let canvasCoordinates = function(x,y) {
  let canvasRect = document.getElementsByClassName("zdog-canvas-half-vector")[0].getBoundingClientRect();
  let height = canvasRect.height;
  let width = canvasRect.width;
  console.log(document.getElementsByClassName("zdog-canvas-half-vector")[0].getBoundingClientRect());
  return{x: (x-canvasRect.x - width/2.0), y:( y-canvasRect.y-height/2.0 - startY/2.0)};
};

let ground2 = ground.copy({
  fill:true,
  color: "hsla(0,0%,80%,0.18)",});
let center = 0.5 * (leftBorder + rightBorder);

let normal  = new Zdog.Shape({
  addTo: illo2,
  path: [
    { x: center, y: startY-b, z:1},
    { x: center, y: startY, z:1}
  ],
  stroke: 10,
  color: hslaToString(gColor[0],gColor[1],gColor[2]*shade, 1.0),
});
let normalTip  = new Zdog.Shape({
  addTo: illo2,
  path: getTrianglePoints(center, startY - b - 10, 1.5*Math.PI),
  stroke: 5,
  color: hslaToString(gColor[0],gColor[1],gColor[2]*shade, 1.0),
  fill: true
});
  

// directly modified by angle
let lightLine = new Zdog.Shape({
  addTo: illo2,
  stroke: 5,
  translate:{z:1},
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
  lightLine.path = [
    { x: startX-c, y: startY-b}, // start at 1st point
    { x:  startX, y: startY }, // line to 2nd point
  ];
  lightLine.updatePath();

  lightTriangle.path = getTrianglePoints(startX-c, startY-b, Math.PI + alpha)
  lightTriangle.updatePath();
};
let updateReflectionLine = function() {
  reflectionLine.path = [
    { x: startX+c, y: startY-b}, // start at 1st point
    { x:  startX, y: startY }, // line to 2nd point
  ];
  reflectionLine.updatePath();

  reflectionTriangle.path = getTrianglePoints(startX+c, startY-b, -alpha)
  reflectionTriangle.updatePath();
};
let updateViewLine = function() {
  viewLine.path = [
    { x: startX+c2, y: startY-b2}, // start at 1st point
    { x:  startX, y: startY }, // line to 2nd point
  ];
  viewLine.updatePath();

  viewTriangle.path = getTrianglePoints(startX+c2, startY-b2, -alpha2)
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

let radius = 170;
let point1 = {x:center , y:startY-radius};
let point2, middlePoint, vector1, vector2, controlPoint1, controlPoint2, controlPoint1b, controlPoint2b;
let part = 1.7;
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
let getArcFromStuff = function(alpha, center, startY, radius, mirrored = false) {
  let point1 = {x:center , y:startY-radius};
  let point2 = {x:center - Math.sin(Math.PI/2.0-alpha) * radius , y:startY - Math.cos(Math.PI/2.0 - alpha) * radius};
  let middlePoint = {x:center - Math.tan(Math.PI/4.0 - alpha/2.0) * radius , y:startY - radius};

  let vector1 = {x:(middlePoint.x - point1.x) / part, y:(middlePoint.y - point1.y)/part};
  let vector2 = {x:(middlePoint.x - point2.x) / part, y:(middlePoint.y - point2.y)/part};

  let controlPoint1 = {x:point1.x + vector1.x ,y: point1.y + vector1.y};
  let controlPoint2 = {x:point2.x + vector2.x ,y: point2.y + vector2.y};

  let path = [point1, {bezier:[controlPoint1,controlPoint2,point2]}];
  return mirrored ? getMirroredArc(path) : path;
}
let updateBezierControlPoints = function() {
  let radiusView = 220;

  arc.path = getArcFromStuff(alpha, center, startY, radius);
  arc2.path = getMirroredArc(JSON.parse(JSON.stringify(arc.path)));
  arcView.path =  getArcFromStuff(alpha2, center, startY, radiusView, true);
  arc.updatePath();
  arc2.updatePath();
  arcView.updatePath();
}
updateBezierControlPoints();

  let leftSide = false;
  new Zdog.Dragger({
    startElement:illo2.element,
    onDragStart:function(pointer){
      leftSide = (canvasCoordinates(pointer.x, pointer.y).x < 0.0);
      arc2.color = hslaToString(gColor0[0],gColor0[1],gColor0[2], 0.5);
      reflectionLine.color = rgbToString(magenta[0] * 0.5, magenta[1] * 0.5, magenta[2] * 0.5);
      reflectionTriangle.color = rgbToString(magenta[0] * 0.5, magenta[1] * 0.5, magenta[2] * 0.5);
    },
    onDragMove:function(pointer, moveX, moveY) {
      if(leftSide) {
        alpha =  alpha0 + moveX/300.0;
        alpha = clamp(alpha, 0.2, 0.5*Math.PI-0.2);
      } else {
        alpha2 =  alpha02 - moveX/300.0;
        alpha2 = clamp(alpha2, 0.2, 0.5*Math.PI-0.2);
      }
      calculateLightRayParameters();
      
      updateLightLine();
      updateReflectionLine();
      updateViewLine();
      
      updateBezierControlPoints();

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
}