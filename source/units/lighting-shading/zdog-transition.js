
let illoTransition = new Zdog.Illustration({
    element: '.zdog-transition',
    dragRotate:false,
    translate:{y:-150},
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
document.getElementById("transition-svg").setAttribute("width",Math.max(document.documentElement.clientWidth, window.innerWidth, 0));
let shapeGroupFilled = new Zdog.Group({
    addTo:illoTransition
});
let shapeGroup = new Zdog.Group({
    addTo:illoTransition
});
let shapes = [];
let shape = new Zdog.Shape({
    addTo:shapeGroup,
    path: shadow.path,
    visible:false,
    color: magentaString,
    stroke: 7
});
let shapeFilled = new Zdog.Shape({
    addTo:shapeGroupFilled,
    path: shadow.path,
    visible:false,
    color: "#aaa",
    fill:true,
    stroke: 0
});
shapes.push(shape);
let square = [[-100,-100],[-100,100],[100,100],[100,-100]];
let pX = (x, scale = 1.0) => {
    let resultPath = [];
    square.forEach(square => {
        resultPath.push({x:x*scale, y: square[0]*scale, z: square[1]*scale});
    });
    return resultPath;
};
let pY = (y, scale = 1.0) => {
    let resultPath = [];
    square.forEach(square => {
        resultPath.push({x: square[0]*scale, y:y*scale, z: square[1]*scale});
    });
    return resultPath;
};
let pZ = (z, scale = 1.0) => {
    let resultPath = [];
    square.forEach(square => {
        resultPath.push({x: square[0]*scale, y: square[1]*scale, z:z*scale});
    });
    return resultPath;
};
let functions = [pX, pY, pZ];
let colors = ["#bbb","#eee","#999"];
for(let i = 0; i <3; i++) {
    for(let j = 1; j < 2; j++) {
        if(i==1) j = 0;
        shapes.push(shape.copy({
            path:functions[i](-100 + 200 * j),
            visible:true
        }));
        shapes.push(shapeFilled.copy({
            path:functions[i](-100 + 200 * j, 0.98),
            visible:true,
            color: colors[i]
        }));
        if(i==1) break;
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
/*
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
});*/
function mix(a, b, t) {
    t = clamp(t, 0.0, 1.0);
    return a*(1-t) + b*t;

}

function smoothstep (x) {
    let edge0 = 0;
    let edge1 = 1;
    let t = clamp((x-edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3.0 - 2.0 * t);
};

function updateAngleFromScroll() {
    let box = document.getElementById("transitionContainer").getBoundingClientRect();
    let top = box.top;
    let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight, 0);
    let transitionElementHeight = 700;
    let minTop = 0.1 * windowHeight; // -> -0.2
    let maxTop = 0.9 * windowHeight;// -> -Math.PI/2.0
    let t = top + transitionElementHeight / 2 - minTop;
    t /= maxTop - minTop;
    viewRotation.x = mix(-0.2, -Math.PI/2.0, smoothstep(t));
    


}
function animate2() {
    document.getElementById("transition-svg").setAttribute("width",Math.max(window.innerWidth, 0));
    shapeGroup.rotate.set(viewRotation);
    shapeGroupFilled.rotate.set(viewRotation);
    shapeFilled.translate.set({z:-1});
    updateStuff();
    updateAngleFromScroll();
    illoTransition.updateRenderGraph();
    requestAnimationFrame( animate2 );
  }
  
  animate2();
  