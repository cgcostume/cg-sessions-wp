
let sliderIllo = new Zdog.Illustration({
    element: '.zdog-slider',
    dragRotate: false,
    zoom:0.5
  });

  let halfSliderWidth = 500;
let slider = new Zdog.Shape({
    addTo: sliderIllo,
    path: [
      { x: -halfSliderWidth, y: 0,}, // start at 1st point
      { x: halfSliderWidth, y: 15}, // start at 1st point
      { x: halfSliderWidth, y: -15}, // start at 1st point
    ],
    stroke: 0,
    closed: true,
    fill:true,
    color: magentaString,
  });


  let slidingThing = new Zdog.Shape({
    addTo: sliderIllo,
    path: [
      { x: -10, y: 25,}, // start at 1st point
      { x: 10, y: 25}, // start at 1st point
      { x: 10, y: -25}, // start at 1st point
      { x: -10, y: -25,}, // start at 1st point
    ],
    stroke: 0,
    closed: true,
    fill:true,
    color: cyanString,
  });


let halfV0 = halfV;
new Zdog.Dragger({
    startElement:sliderIllo.element,
    onDragStart:function(){},
    onDragMove:function(pointer, moveX, moveY) {
      halfV =  halfV0 + moveX/halfSliderWidth;
      halfV = clamp(halfV, 0.0, 1.0);
      renderer.frame();
    },
    onDragEnd:function(){
      halfV0 = halfV;
    }
  });

  
  
function animateSlider() {
    slidingThing.translate = {x: halfSliderWidth*(2.0*halfV - 1.0)};
    sliderIllo.updateRenderGraph();
    requestAnimationFrame( animateSlider );
  }
  
  animateSlider();