//TODO: add default curve
function demo2 () {
  // Get a reference to the canvas object
  var canvas = document.getElementById('demo2');
  // Create an empty project and a view for the canvas:
  var pScope = new paper.PaperScope();
  pScope.setup(canvas);

  var tool = new pScope.Tool();
  //tool.minDistance = 10;
  //tool.maxDistance = 10;
  var t = 0.8;

  pScope.view.draw();
  var path;
  var samplePoints = new pScope.Group();
  var connectors = new pScope.Group();
  var circle;
  var text;
  var endText;
  var pbText;
  var currentColor;
  var approxLen;


  var hint = new pScope.Raster('curve_hint');
  hint.position = pScope.view.center;
  hint.scale(0.15);

  var pbSize = new pScope.Size(400,14);
  var pbYOffset = -150;
  var pbOffset = new pScope.Point(-pbSize.width / 2,pbYOffset -pbSize.height / 2);
  var pbRadius = pbSize.height / 2;
  var pbPoint = pScope.view.center.add(pbOffset);
  var progressBarBack = new pScope.Path.Rectangle(new pScope.Rectangle(pbPoint, pbSize), pbRadius);
  progressBarBack.fillColor = 'lightGrey';

  var progressBarFront;
  function createFrontProgressBar(t){
    if(progressBarFront && progressBarFront.parent) {
      progressBarFront.remove();
    }
    /*var pbFrontSize = pbSize.clone();
    pbFrontSize.width *= t;
    progressBarFront = new pScope.Path.Rectangle(new pScope.Rectangle(pbPoint, pbFrontSize), pbRadius);
    progressBarFront.fillColor = 'magenta';*/

    if(!circle || !circle.parent) {
      circle = new pScope.Path.Circle({
        radius:8,
        fillColor: 'white',
        strokeColor: 'magenta',
        strokeWidth:5
      });
    }
    else circle.bringToFront();
    circle.position = pbPoint.add(new pScope.Point(pbSize.width * t, pbSize.height/2.0));
  }

  var samplePointSample = new pScope.Path.Circle(pbPoint, 3);
  //samplePointSample.strokeColor='black';
  samplePointSample.visible = false;

  //var progressBarFront = progressBarBack.clone();
  //progressBarFront.fillColor = 'magenta';
  //progressBarFront.scale(t, 1, pbPoint);

  function inverseRemove(thing) {
    pScope.project.activeLayer.addChild(thing);
  }

  function updateSamplePoints(path, t) {
    var deltaT = t/3.0+0.01;
    var pointCount = Math.ceil(1.0/deltaT)+1;
    
    //check if we have the right number of sample points already
    //add and remove connections and points as necessary
    while(samplePoints.children.length < pointCount) {
      var newSamplePoint = samplePointSample.clone();
      newSamplePoint.visible = true;

      if(samplePoints.children.length > 0) {
        connectors.addChild(new pScope.Path.Line(pbPoint, pbPoint));
      }
      samplePoints.addChild(newSamplePoint);
    }
    while(samplePoints.children.length > pointCount) {
      samplePoints.lastChild?.remove();
      connectors.lastChild?.remove();
    }

    //update all positions
    var prevPos;
    approxLen = 0.0;
    for(var i = 0; i < pointCount; i++) {
      var pathPos = path.getPointAt(path.length * Math.min(deltaT * i, 1.0));
      samplePoints.children[i].position = pathPos;
      samplePoints.children[i].fillColor = currentColor;

      if(i > 0) {
        var line = connectors.children[i-1];
        line.firstSegment.point = prevPos;
        line.lastSegment.point = pathPos;
        line.strokeColor=currentColor;
        line.strokeWidth=2;
        line.dashArray = [10,5];
        approxLen += line.length;
      }

      prevPos = pathPos;
    }
    connectors.bringToFront();
    samplePoints.bringToFront();

  }

  function updatePathProgress(path, t) {
    if(pathDone) updateSamplePoints(path, t);

    if(!text || !text.parent) {
      text = new pScope.PointText({
        fontSize: 16,
        fillColor: currentColor,
        fontWeight: 'bold',
        justification: 'center',
      });
    }
    else text.bringToFront();

    if(!endText || !endText.parent) {
      endText = new pScope.PointText({
        fontSize: 16,
        fillColor: currentColor,
        fontWeight: 'bold',
        justification: 'center',
      });
    }
    else endText.bringToFront();
    
    if(!pbText || !pbText.parent) {
      pbText = text.clone();
    }
    
    text.content = "approx. length:\n"+(approxLen/40.0).toFixed(2);
    var offset = new pScope.Point(0,30);
    text.position = (circle.position.add(offset));

    endText.content = "exact length:\n"+(path.length/40.0).toFixed(2);
    offset = new pScope.Point(-Math.max(0.0, -20.0+pbPoint.x - text.bounds.left)-endText.bounds.width /2.0 -10.0,0);
    endText.position = (progressBarBack.bounds.bottomLeft.add(offset));

    text.fillColor = currentColor;
    endText.fillColor = currentColor;

    createFrontProgressBar(t);
    circle.strokeColor = currentColor;
    
    pbText.content = "Δt = "+(t/3.0+0.01).toFixed(2);
    var circlePos = circle.position;
    offset = new pScope.Point(0,-20);
    pbText.position = circlePos.add(offset);
    pbText.fillColor=currentColor

    pScope.view.draw();
  }

  function removeAllOldStuff(){
    
    //remove old (split) curve
    //circle?.remove();
    //text?.remove();
    //endText?.remove();
    //pbText?.remove();
    path?.remove();
  }

  //load path from teaser image
  path = new pScope.Path("M789.685,250.634C789.685,250.634 765.646,255.323 747.727,296.903C729.807,338.484 719.318,356.84 719.755,368.204C720.192,379.567 721.066,386.123 710.576,390.057C705.356,392.015 678.056,402.303 598.425,403.13C541.708,403.72 482.371,407.638 476.748,408.414C464.073,410.162 456.206,420.651 447.028,426.333C437.849,432.015 428.234,435.074 415.559,440.756C402.884,446.438 378.846,455.179 370.105,439.008C361.363,422.837 360.489,398.798 362.237,379.567C363.986,360.337 362.237,349.847 333.828,355.966C305.419,362.085 273.514,344.602 267.395,338.921C261.276,333.239 268.706,327.557 263.024,324.498C257.342,321.438 240.297,313.134 240.297,313.134");
  path.strokeWidth = 5;
  path.scale(0.9);
  path.strokeCap = 'round';
  path.reverse();
  path.translate(new pScope.Point(-50,-100));
  path.strokeColor = "lightGrey";
  currentColor = "#05FDD9";
  createFrontProgressBar(t);
  updatePathProgress(path,t);

  var progressSelected = false;
  var pathDone = true;
  tool.onMouseDown = function(event){
    if(event.point.y < progressBarBack.bounds.bottom + 5) {
      progressSelected = true;
      return;
    }
    hint.remove();

    pathDone = false;
    progressSelected = false;

    removeAllOldStuff();

    path = new pScope.Path();
    currentColor = pScope.Color.random();
    path.strokeColor = currentColor;
    path.strokeCap = 'round';
  }

  tool.onMouseDrag = function(event) {
    if(progressSelected) {
      t = Math.min(1.0, Math.max(0.0, event.point.x-pbPoint.x)/pbSize.width);
      //if(path) updatePathProgress(path);
      return;
    }
    path.add(event.point);
    
    pScope.view.draw();
  }

  tool.onMouseUp = function(event){
    if(progressSelected) {
      return;
    }
    path.strokeWidth = 5;
    path.strokeColor='lightGrey';
    path.simplify(1000.0);
    pathDone = true;

    //updatePathProgress(path);
  }

  tool.onKeyDown = function(event) {
    var delta = 0.01;
    if(event.key == "a") t = Math.max(t-delta, 0.0);
    if(event.key == "d") t = Math.min(t+delta, 1.0);
  
    //updatePathProgress(path);
  }

  var progressT = t;
  pScope.project.activeLayer.onFrame = function (event) {
    var delta = t - progressT;
    progressT += delta /20;
    if(Math.abs(progressT - t)<0.0001) progressT = t;
    updatePathProgress(path, progressT);
  }
}