
let illoTransition = new Zdog.Illustration({
    element: '.zdog-transition',
    dragRotate:false,
    //translate:{y:-200},
  });
function p3(x,y,z) {
    return {x:x, y:y, z:z};
}
let shadow = new Zdog.Shape({
    addTo: illoTransition,
    path:[p(0,0), p(5000,500), p(-5000,500)],
    color:"#000",
    fill:true,
    stroke:5,
    closed:true,
    translate:{z:-500}
});
document.getElementById("transition-svg").setAttribute("width",Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0))
let shapeGroup = new Zdog.Group({
    addTo:illoTransition
});
let shapes = [];
let shape = new Zdog.Shape({
    addTo:shapeGroup,
    path: shadow.path,
    visible:false,
    color: magentaString,
    stroke: 5
});
shapes.push(shape);
let square = [[-100,-100],[-100,100],[100,100],[100,-100]];
let pX = (x) => {
    let resultPath = [];
    square.forEach(square => {
        resultPath.push({x:x, y: square[0], z: square[1]});
    });
    return resultPath;
};
let pY = (y) => {
    let resultPath = [];
    square.forEach(square => {
        resultPath.push({x: square[0], y:y, z: square[1]});
    });
    return resultPath;
};
let pZ = (z) => {
    let resultPath = [];
    square.forEach(square => {
        resultPath.push({x: square[0], y: square[1], z:z});
    });
    return resultPath;
};
let functions = [pX, pY, pZ];
for(let i = 0; i <3; i++) {
    for(let j = 0; j < 2; j++) {
            shapes.push(shape.copy({
                path:functions[i](-100 + 200 * j),
                visible:true
            }));
    }
}
let viewRotation = new Zdog.Vector();
viewRotation.y =  0.15;
viewRotation.x = -0.3;
shapeGroup.rotate.set(viewRotation);
let dragStartRX, dragStartRY;
function updateStuff(){

    let angle = viewRotation.y + Math.PI/4.0 + Math.PI;
    angle %= Math.PI / 2.0;

    let xStuff = -Math.abs(Math.cos(angle));
    let yStuff = 1.0 - Math.sin(angle);

    let x2 = Math.sin(angle);
    let y2 = 1.0 + xStuff;
    
    let thing1 = new Zdog.Vector();
    thing1.x = xStuff;
    thing1.y = yStuff;
    let thing2 = new Zdog.Vector();
    thing2.x = x2;
    thing2.y = y2;

    thing1.y*=Math.sin(-viewRotation.x);
    thing2.y*=Math.sin(-viewRotation.x);

    let yDiff = -Math.sqrt(80000.0)/2.0;
    thing1.multiply(-yDiff * 1.0);
    thing2.multiply(-yDiff * 1.0);
    yDiff*=Math.sin(-viewRotation.x);
    yDiff+=100*(Math.cos(-viewRotation.x));

    //TODO: refactor! (as soon as everything works)
    shadow.path = [p(0,yDiff),p(thing1.x,thing1.y+yDiff), p(thing2.x,thing2.y+yDiff)];
    shadow.path = [p(thing1.x,thing1.y+yDiff),p(thing1.x/thing1.magnitude() *10000.0,thing1.y/thing1.magnitude() *10000.0+yDiff), p(thing2.x/thing2.magnitude() *10000.0,thing2.y/thing2.magnitude()*10000.0+yDiff), p(thing2.x,thing2.y+yDiff)];
    shadow.updatePath();
}
new Zdog.Dragger({
    startElement: illoTransition.element,
    onDragStart: function() {
        dragStartRX = viewRotation.x;
        dragStartRY = viewRotation.y;
    },
    onDragMove: function(pointer, moveX, moveY) {
        let moveRX = moveY / illoTransition.width * Zdog.TAU * -1;
        let moveRY = moveX / illoTransition.width * Zdog.TAU * -1;

        viewRotation.y = clamp(dragStartRY + moveRY, -Math.PI/4.0 + 0.001, Math.PI/4.0 -0.001);
        updateStuff();
    },
    onDragEnd:function(){

    }
});
function mix(a, b, t) {
    t = clamp(t, 0.0, 1.0);
    return a*(1-t) + b*t;

}
function updateAngleFromScroll() {
    let box = document.getElementById("transitionContainer").getBoundingClientRect();
    let top = box.top;
    let minTop = -200; // -> -0.2
    let maxTop = 700;// -> -Math.PI/2.0
    let t = top - minTop;
    t /= maxTop - minTop;
    viewRotation.x = mix(-0.2, -Math.PI/2.0, t);
    


}
function animate2() {
    shapeGroup.rotate.set(viewRotation);
    updateStuff();
    updateAngleFromScroll();
    illoTransition.updateRenderGraph();
    requestAnimationFrame( animate2 );
  }
  
  animate2();
  