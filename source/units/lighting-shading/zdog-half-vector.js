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

let alpha0 = 70.0 * Math.PI / 180.0;
let alpha = alpha0;
let a = 100; // distance between light rays
let l = 500; // light ray len
let b = Math.sin(alpha) * l; // height of light rays
let c = b / Math.tan(alpha);
let h = a / Math.sin(alpha);

// rgb [14, 223, 241];
let gColor0 = [185, 89, 50];
let gColor = [255, 255, 255];
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
  path: [
    { x: startX-c, y: startY-b}, // start at 1st point
    { x:  startX, y: startY }, // line to 2nd point
  ],
  stroke: 5,
  translate:{z:1},
});
let lightTriangle = new Zdog.Shape({
  addTo: illo2,
  path: getTrianglePoints(startX-c, startY-b, Math.PI+alpha),
  stroke: 0,
  translate:{z:1},
  fill: true
});

// reflection light ray
let reflectionLine = lightLine.copy({path: [
  { x: startX+c, y: startY-b}, // start at 1st point
  { x:  startX, y: startY }, // line to 2nd point
]});
let reflectionTriangle = lightTriangle.copy({path: getTrianglePoints(startX+c, startY-b, -alpha)});

  let fadeFormula = function(h, i) {
    let left = startX + h * i - leftBorder;
    let right = rightBorder - (startX  + h * i);
    let leftClamped = clamp(left, 0, fadeRange) * (1 / fadeRange);
    let rightClamped =  clamp(right, 0, fadeRange) * (1 / fadeRange);
    return leftClamped * rightClamped;
  }
  let lineColor = () => [255, 15, 200];


  
  let baseC = lineColor();
  let factor2 = fadeFormula(h, 0);
  lightLine.color = rgbToString(baseC[0] * factor2, baseC[1] * factor2, baseC[2] * factor2);
  lightTriangle.color = rgbToString(baseC[0] * factor2, baseC[1] * factor2, baseC[2] * factor2);
  reflectionLine.color = rgbToString(baseC[0] * factor2, baseC[1] * factor2, baseC[2] * factor2);
  reflectionTriangle.color = rgbToString(baseC[0] * factor2, baseC[1] * factor2, baseC[2] * factor2);

  let radius = 170;
  let point1 = {x:center , y:startY-radius};
  let point2 = {x:center - Math.sin(Math.PI/2.0-alpha)*radius , y:startY - Math.cos(Math.PI/2.0-alpha)*radius};
  let middlePoint = {x:center - Math.sin(Math.PI/4.0-alpha/2.0)*radius , y:startY-radius};
  let part = 1.6;
  let vector1 = {x:(middlePoint.x - point1.x) / part, y:(middlePoint.y - point1.y)/part};
  let vector2 = {x:(middlePoint.x - point2.x) / part, y:(middlePoint.y - point2.y)/part};

  let controlPoint1 = {x:point1.x + vector1.x ,y: point1.y + vector1.y};
  let controlPoint2 = {x:point2.x + vector2.x ,y: point2.y + vector2.y};
  let controlPoint1b = {x:-(point1.x + vector1.x) ,y: point1.y + vector1.y};
  let controlPoint2b = {x:-(point2.x + vector2.x) ,y: point2.y + vector2.y};
  let arc = lightLine.copy({path:[point1, {bezier:[controlPoint1,controlPoint2,point2]} ], closed: false, color:hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0)});
  let arc2 = lightLine.copy({path:[point1, {bezier:[controlPoint1b,controlPoint2b, {x:-point2.x,y:point2.y}]} ], closed: false, color:hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0)});

  let started = false;
  new Zdog.Dragger({
    startElement:illo2.element,
    onDragStart:function(pointer){
      arc2.color = hslaToString(gColor0[0],gColor0[1],gColor0[2], 0.5);
      reflectionLine.color = rgbToString(baseC[0] * factor2 * 0.5, baseC[1] * factor2 * 0.5, baseC[2] * factor2*0.5);
      reflectionTriangle.color = rgbToString(baseC[0] * factor2 * 0.5, baseC[1] * factor2 * 0.5, baseC[2] * factor2 * 0.5);
    },
    onDragMove:function(pointer, moveX, moveY) {
      alpha =  alpha0 + moveX/300.0;
      alpha = clamp(alpha, 0.2, 0.5*Math.PI-0.2);
      b = Math.sin(alpha) * l; // height of light rays
      c = b / Math.tan(alpha); 
      h = a / Math.sin(alpha);
      
      //light modifications
      lightLine.path = [
        { x: startX-c, y: startY-b}, // start at 1st point
        { x:  startX, y: startY }, // line to 2nd point
      ];
      lightLine.updatePath();

      lightTriangle.path = getTrianglePoints(startX-c, startY-b, Math.PI + alpha)
      lightTriangle.updatePath();

      //reflection modifications
      reflectionLine.path = [
        { x: startX+c, y: startY-b}, // start at 1st point
        { x:  startX, y: startY }, // line to 2nd point
      ];
      reflectionLine.updatePath();

      reflectionTriangle.path = getTrianglePoints(startX+c, startY-b, -alpha)
      reflectionTriangle.updatePath();
      
      // point1 = {x:center , y:startY-radius};
      point2 = {x:center - Math.sin(Math.PI/2.0-alpha)*radius , y:startY - Math.cos(Math.PI/2.0-alpha)*radius};
      middlePoint = {x:center - Math.sin(Math.PI/4.0-alpha/2.0)*radius , y:startY-radius};

      vector1 = {x:(middlePoint.x - point1.x) / part, y:(middlePoint.y - point1.y)/part};
      vector2 = {x:(middlePoint.x - point2.x) / part, y:(middlePoint.y - point2.y)/part};

      controlPoint1 = {x:point1.x + vector1.x ,y: point1.y + vector1.y};
      controlPoint2 = {x:point2.x + vector2.x ,y: point2.y + vector2.y};
      controlPoint1b = {x:-(point1.x + vector1.x) ,y: point1.y + vector1.y};
      controlPoint2b = {x:-(point2.x + vector2.x) ,y: point2.y + vector2.y};
      arc.path =  [point1, {bezier:[controlPoint1,controlPoint2,point2]} ];
      arc2.path =  [point1, {bezier:[controlPoint1b,controlPoint2b, {x:-point2.x,y:point2.y}]} ];
      arc.updatePath();
      arc2.updatePath();

      shade = Math.cos(Math.PI / 2.0 - alpha);
      ground.color = hslaToString(gColor[0], gColor[1], gColor[2] * shade, 1.0);
    },
    onDragEnd:function(){
      alpha0 = alpha;
      arc2.color = hslaToString(gColor0[0],gColor0[1],gColor0[2], 1.0);
      reflectionLine.color = rgbToString(baseC[0] * factor2, baseC[1] * factor2, baseC[2] * factor2);
      reflectionTriangle.color = rgbToString(baseC[0] * factor2, baseC[1] * factor2, baseC[2] * factor2);
    }
  });
  illo2.zoom = 0.5;
  function animate() {
    illo2.updateRenderGraph();
    requestAnimationFrame( animate );
  }
  
  animate();
}