//TODO: add default curve
function demo3 () {
  // Get a reference to the canvas object
  var canvas = document.getElementById('demo3');
  // Create an empty project and a view for the canvas:
  var pScope = new paper.PaperScope();
  pScope.setup(canvas);

  var tool = new pScope.Tool();
  //tool.minDistance = 10;
  //tool.maxDistance = 10;
  var t = 0.8;

  pScope.view.draw();
  var path;
  var path1;
  var path2;
  var circle;
  var text;
  var pbText;
  var maxT = 16.0;
  var cosLine;
  var sinLine;
  var cosText;
  var sinText;

  function essentialSpiralPoint(t) {
    var x = t * Math.cos(t);
    var y = t * Math.sin(t);
    return new pScope.Point(x,y);
  }
  function spiralPoint(t) {
    var scale = 8.0;
    return essentialSpiralPoint(t * maxT).multiply(scale).add(pScope.view.center);
  }
  function createSpiral(){
    var sampleCount = 10000.0;

    var spiralPath = new pScope.Path();
    for(var i = 0; i < sampleCount; i++) {
      var t = i / sampleCount;

      spiralPath.add(spiralPoint(t));
    }
    return spiralPath;
  }

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
    var pbFrontSize = pbSize.clone();
    pbFrontSize.width *= t;
    progressBarFront = new pScope.Path.Rectangle(new pScope.Rectangle(pbPoint, pbFrontSize), pbRadius);
    progressBarFront.fillColor = 'magenta';
  }

  function inverseRemove(thing) {
    pScope.project.activeLayer.addChild(thing);
  }

  function updatePathProgress(path, t) {
    path1?.remove();
    path2?.remove();
    inverseRemove(path);

    path1 = path.clone();
    path.remove();

    var spiralP = spiralPoint(t);
    var p = path1.getNearestLocation(spiralP);
    if(p) path2 = path1.splitAt(p);
    else path2 = path1.splitAt(100);
    if(path2)  {
      path2.strokeColor = 'lightGrey';
      path2.strokeWidth =3;
    }
    path1.strokeWidth =5;

    if(!path1.lastSegment) return;
    var splitPoint = path1.lastSegment.point;
    var curveCoordinates = splitPoint.subtract(pScope.view.center).divide(40.0);

    if(!circle || !circle.parent) {
      circle = new pScope.Path.Circle({
        radius:8,
        fillColor: 'white',
        strokeColor: path1.strokeColor,
        strokeWidth:5
      });
    }
    else circle.bringToFront();

    if(!text || !text.parent) {
      text = new pScope.PointText({
        fontSize: 16,
        fillColor: path1.strokeColor,
        fontWeight: 'bold',
        justification: 'center',
      });
    }
    else text.bringToFront();
    
    if(!pbText || !pbText.parent) {
      pbText = text.clone();
    }

    if(!cosLine) {
      var c = pScope.view.center;
      var spiralBounds = path.bounds;
      var offset = 30.0;
      var cosStart = c.add(new pScope.Point(0, spiralBounds.height / 2.0 + offset * 1.5));
      var sinStart = c.add(new pScope.Point(spiralBounds.width / 2.0 + offset, 0));

      cosLine = new pScope.Path(cosStart, cosStart);
      sinLine = new pScope.Path(sinStart, sinStart);

      cosLine.strokeColor = 'magenta';
      cosLine.strokeWidth = 3;
      sinLine.strokeWidth = 3;
      sinLine.strokeColor = 'black';

      cosText = new pScope.PointText({
        fontSize: 16,
        fillColor: cosLine.strokeColor,
        fontWeight: 'bold',
        justification: 'center',
      });
      sinText = new pScope.PointText({
        fontSize: 16,
        fillColor: sinLine.strokeColor,
        fontWeight: 'bold',
        justification: 'center',
      });
    }
    var coords = essentialSpiralPoint(t*maxT);

    cosLine.lastSegment.point.x = spiralP.x;
    sinLine.lastSegment.point.y = spiralP.y;

    cosText.content = "t • cos(t) = " + coords.x.toFixed(2);
    sinText.content = "t • sin(t) = " + coords.y.toFixed(2);
    cosText.position = cosLine.bounds.rightCenter.add(new pScope.Point(cosText.bounds.width/2.0 + 10.0,0));
    sinText.position = sinLine.bounds.topRight.add(new pScope.Point(sinText.bounds.width/2.0 + 10.0,0));
    
    circle.position = splitPoint;
    
    text.content = coords.x.toFixed(1)+" | "+coords.y.toFixed(1);
    var offset = new pScope.Point(0,-30);
    text.position = (splitPoint.add(offset));

    createFrontProgressBar(t);
    progressBarFront.fillColor = path1.strokeColor;
    
    pbText.content = "t = "+(t*maxT).toFixed(2);
    var pbBounds = progressBarFront.bounds;
    offset = new pScope.Point(0,-15);
    pbText.position = pbBounds.topRight.add(offset);

    pScope.view.draw();
  }

  function removeAllOldStuff(){
    
    //remove old (split) curve
    path1?.remove();
    path2?.remove();
    circle?.remove();
    text?.remove();
    pbText?.remove();
  }

  //load path from teaser image
  path =createSpiral();// new pScope.Path("M789.685,250.634C789.685,250.634 765.646,255.323 747.727,296.903C729.807,338.484 719.318,356.84 719.755,368.204C720.192,379.567 721.066,386.123 710.576,390.057C705.356,392.015 678.056,402.303 598.425,403.13C541.708,403.72 482.371,407.638 476.748,408.414C464.073,410.162 456.206,420.651 447.028,426.333C437.849,432.015 428.234,435.074 415.559,440.756C402.884,446.438 378.846,455.179 370.105,439.008C361.363,422.837 360.489,398.798 362.237,379.567C363.986,360.337 362.237,349.847 333.828,355.966C305.419,362.085 273.514,344.602 267.395,338.921C261.276,333.239 268.706,327.557 263.024,324.498C257.342,321.438 240.297,313.134 240.297,313.134");
  path.simplify(0.001);
  console.log(path);
  //path.scale(0.9);
  path.strokeCap = 'round';
  //path.reverse();
  //path.translate(new pScope.Point(-50,-100));
  path.strokeColor = "#05FDD9";
  createFrontProgressBar(t);
  updatePathProgress(path,t);

  var progressSelected = false;
  var pathDone = true;
  tool.onMouseDown = function(event){
    if(event.point.y < progressBarBack.bounds.bottom + 5) {
      progressSelected = true;
      return;
    }

    progressSelected = false;
    return;
    pathDone = false;

    removeAllOldStuff();

    path = new pScope.Path();
    path.strokeColor = pScope.Color.random();
    path.strokeCap = 'round';
  }

  tool.onMouseDrag = function(event) {
    if(progressSelected) {
      t = Math.min(1.0, Math.max(0.0, event.point.x-pbPoint.x)/pbSize.width);
      //if(path) updatePathProgress(path);
      return;
    }

    var l = path.getNearestPoint(event.point);
    l=l.subtract(pScope.view.center).divide(8.0);
    
    var tPrime = Math.atan2(l.y,l.x);
    t = Math.min(1.0, Math.max(0.0, l.x / Math.cos(tPrime))/maxT);
    return;
    path.add(event.point);
    
    pScope.view.draw();
  }

  tool.onMouseUp = function(event){
    if(progressSelected) {
      return;
    }
    return;
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
    if(pathDone) updatePathProgress(path, progressT);
  }
}