// Made with Zdog
let illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    dragRotate: false,
  });
  
  let rgbToString = function(r, g, b) {
    return "rgb("+r.toString() +","+g.toString()+","+b.toString()+")";
  }

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
  
  let alpha0 = 70.0 * Math.PI / 180.0;
  let alpha = alpha0;
  let a = 100;
  let b = 500;
  let c = b / Math.tan(alpha);
  let h = a / Math.sin(alpha);

  //hsl(185,89,50)
  let gColor0 = [14, 223, 241];
  let gColor = gColor0;
  let lambert = Math.cos(Math.PI / 2.0 - alpha);
  gColor = [gColor0[0] * lambert, gColor0[1] * lambert, gColor0[1] * lambert];
  
  let leftBorder = -520;
  let rightBorder = 520;
  let ground  = new Zdog.Shape({
    addTo: illo,
    path: [
      { x: leftBorder, y: 200, z:1}, // start at 1st point
      { x:  rightBorder, y: 200, z:1 }, // line to 2nd point
      { x:  rightBorder, y: 300, z:1 }, // line to 2nd point
      { x: leftBorder, y: 300, z:1}, // start at 1st point
    ],
    stroke: 10,
    color: rgbToString(gColor[0],gColor[1],gColor[2]),
    //fill: true
  });

  /*
  ground.copy({
    stroke: 20,
    fill:false,
    color: "hsla(185,89%,50%,0.3)",})*/
  
  let startX = -0;
  let startY = -300;
  let fadeRange = 50;
  
  let lines = [];
  
  lines.push(new Zdog.Shape({
    addTo: null,
    path: [
      { x: startX-c, y: startY}, // start at 1st point
      { x:  startX, y: startY + b }, // line to 2nd point
    ],
    stroke: 5,
    color: "rgb(100,100,100)",//'#ff0fb5',
    translate:{z:1},
    visible: false
  }));
  
  for(let i = -9; i <9; i++) {
    
    lines.push(lines[0].copy({visible:true, addTo: illo, translate: {x:h * i}}));
        lines[i+10].color = "rgb(255,15,"+ (i*20+400).toString() +")";
    let baseColor = [255, 15, i*20+200];
  
          let factor = clamp((startX + h*i - leftBorder),0, fadeRange) * (1/fadeRange) * clamp(rightBorder - (startX  + h*i),0, fadeRange) * (1/fadeRange);
            lines[i+10].color = rgbToString(baseColor[0]*factor, baseColor[1]*factor, baseColor[2]*factor);
       // }

  }
  
  new Zdog.Dragger({
    startElement:illo.element,
    onDragStart:function(){},
    onDragMove:function(pointer, moveX, moveY){
      alpha =  alpha0 + moveX/300.0;
      alpha = Math.max(alpha, 0.2);
      alpha = Math.min(alpha, Math.PI-0.2);
      c = b / Math.tan(alpha); 
      h = a / Math.sin(alpha);
      for(let i = -9; i <9; i++) {
          lines[i+10].path = [
            {x: startX-c, y: startY},
            {x:  startX, y: startY + b}
          ];
        lines[i+10].translate = {x:h * i};
        lines[i+10].updatePath();
        lines[i+10].color = "rgb(255,15,"+ (i*20+200).toString() +")";

    let baseColor = [255, 15, i*20+200];
    let factor = clamp((startX + h*i - leftBorder),0, fadeRange) * (1/fadeRange) * clamp(rightBorder - (startX  + h*i),0, fadeRange) * (1/fadeRange);
    lines[i+10].color = rgbToString(baseColor[0]*factor, baseColor[1]*factor, baseColor[2]*factor);
      }
      lambert = Math.cos(Math.PI / 2.0 - alpha);
      gColor = [gColor0[0] * lambert, gColor0[1] * lambert, gColor0[1] * lambert];
      ground.color = rgbToString(gColor[0],gColor[1],gColor[2]);
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
  