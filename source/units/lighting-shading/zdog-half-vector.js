// Made with Zdog

let illo = new Zdog.Illustration({
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
let b = 500; // height of light rays
let c = b / Math.tan(alpha);
let h = a / Math.sin(alpha);

// rgb [14, 223, 241];
let gColor0 = [185, 89, 50];
let gColor = gColor0;
let lambert = Math.cos(Math.PI / 2.0 - alpha);

let leftBorder = -520;
let rightBorder = 520;
let ground  = new Zdog.Shape({
  addTo: illo,
  path: [
    { x: leftBorder, y: 300, z:1}, // start at 1st point
    { x: leftBorder, y: 200, z:1}, // start at 1st point
    { x:  rightBorder, y: 200, z:1 }, // line to 2nd point
    { x:  rightBorder, y: 300, z:1 }, // line to 2nd point
  ],
  stroke: 10,
  closed: false,
  color: hslaToString(gColor[0],gColor[1],gColor[2]*lambert, 1.0),
});

let ground2 = ground.copy({
  fill:true,
  color: "hsla(185,89%,50%,0.08)",});

let startX = -0;
let startY = -300;
let fadeRange = 50;

let lines = [];
let triangles = [];
triangles.push(new Zdog.Shape({
  addTo: illo,
  path: getTrianglePoints(startX, startY+ b, alpha),
  stroke: 0,
  translate:{z:1},
  visible: false,
  fill: true
}));

lines.push(new Zdog.Shape({
  addTo: null,
  path: [
    { x: startX-c, y: startY}, // start at 1st point
    { x:  startX, y: startY + b }, // line to 2nd point
  ],
  stroke: 5,
  translate:{z:1},
  visible: false
}));

let fadeFormula = function(h, i) {
  let left = startX + h * i - leftBorder;
  let right = rightBorder - (startX  + h * i);
  let leftClamped = clamp(left, 0, fadeRange) * (1 / fadeRange);
  let rightClamped =  clamp(right, 0, fadeRange) * (1 / fadeRange);
  return leftClamped * rightClamped;
}
let lineColorFromI = (i) => [255, 15, i * 20 + 200];

for(let i = -9; i < 9; i++) {
  
  lines.push(
      lines[0].copy(
          {
              visible:true,
              addTo: illo,
              translate: {x:h * i}
          }
      )
  );

  triangles.push(triangles[0].copy(
    {
        visible:true,
        addTo: illo,
        translate: {x:h * i}
    }
));

  let baseColor = lineColorFromI(i);
  let factor = fadeFormula(h, i);
  lines[i+10].color = rgbToString(baseColor[0] * factor, baseColor[1] * factor, baseColor[2] * factor);
  triangles[i+10].color = rgbToString(baseColor[0] * factor, baseColor[1] * factor, baseColor[2] * factor);

}
let getDistanceMarker = function(x, y, h, b) {
 let height = 50;
return [
{ x: x , y: y +b +height}, // start at 1st point
{ x: x  + h, y: y +b+height} // start at 1st point
]
};
let distance  = new Zdog.Shape({
  addTo: illo,
  path: getDistanceMarker(startX, startY, h, b),
  stroke: 5,
  closed: false,
  color: hslaToString(185, 0, 100, 1.0),
});
let path = getDistanceMarker(startX, startY, h, b);
let pointA = path[0];
let pointB = path[1];
let distanceA  = new Zdog.Shape({
  addTo: illo,
  path: [
    {x: pointA.x, y: pointA.y-15},
    {x: pointA.x, y: pointA.y+15},
  ],
  stroke: 5,
  closed: false,
  color: hslaToString(185, 0, 100, 1.0),
});
let distanceB  = new Zdog.Shape({
  addTo: illo,
  path: [
    {x: pointB.x, y: pointB.y-15},
    {x: pointB.x, y: pointB.y+15},
  ],
  stroke: 5,
  closed: false,
  color: hslaToString(185, 0, 100, 1.0),
});
let distance2  = new Zdog.Shape({
  addTo: illo,
  path: [
    { x: startX, y: startY+b}, // start at 1st point
    { x: startX + Math.cos(Math.PI / 2 - alpha) * a, y: b+startY - Math.sin(Math.PI / 2 - alpha) * a} // start at 1st point
  ],
  stroke: 5,
  closed: false,
  color: "#888",
  visible: false,
});

new Zdog.Dragger({
  startElement:illo.element,
  onDragStart:function(){},
  onDragMove:function(pointer, moveX, moveY) {
    alpha =  alpha0 + moveX/300.0;
    alpha = clamp(alpha, 0.2, Math.PI-0.2);
    c = b / Math.tan(alpha); 
    h = a / Math.sin(alpha);
    for(let i = -9; i <9; i++) {
        lines[i+10].path = [
          {x: startX - c, y: startY},
          {x:  startX, y: startY + b}
        ];
      lines[i+10].translate = {x: h * i};
      lines[i+10].updatePath();

      let baseColor = lineColorFromI(i);
      let factor = fadeFormula(h,i);
      lines[i+10].color = rgbToString(baseColor[0] * factor, baseColor[1] * factor, baseColor[2] * factor);
    
      triangles[i+10].path = getTrianglePoints(startX, startY+b, alpha);
      triangles[i+10].updatePath();
      triangles[i+10].translate = {x: h * i};
      triangles[i+10].color = rgbToString(baseColor[0] * factor, baseColor[1] * factor, baseColor[2] * factor);
    
    }

    let path = getDistanceMarker(startX, startY, h, b);
    let pointA = path[0];
    let pointB = path[1];
    distance.path = path;
    distanceA.path = [
      {x: pointA.x, y: pointA.y-15},
      {x: pointA.x, y: pointA.y+15},
    ];
    distanceB.path = [
      {x: pointB.x, y: pointB.y-15},
      {x: pointB.x, y: pointB.y+15},
    ];
    distance.updatePath();
    distanceA.updatePath();
    distanceB.updatePath();


    distance2.path =  [
      { x: startX, y: startY+b}, // start at 1st point
      { x: startX + Math.cos(Math.PI / 2 - alpha) * a, y: b+startY - Math.sin(Math.PI / 2 - alpha) * a} // start at 1st point
    ];
    distance2.updatePath();

    lambert = Math.cos(Math.PI / 2.0 - alpha);
    ground.color = hslaToString(gColor[0], gColor[1], gColor[2] * lambert, 1.0);
  },
  onDragEnd:function(){
    alpha0 = alpha;
  }
});
illo.zoom = 0.5;
function animate() {
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();
