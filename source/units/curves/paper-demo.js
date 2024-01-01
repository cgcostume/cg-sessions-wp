//TODO: add default curve
window.onload = function() {
  // Get a reference to the canvas object
  var canvas = document.getElementById('demo1');
  // Create an empty project and a view for the canvas:
  paper.setup(canvas);

  var tool = new paper.Tool();
  //tool.minDistance = 10;
  //tool.maxDistance = 10;
  var t = 0.8;

  paper.view.draw();
  var path;
  var path1;
  var path2;
  var circle;
  var text;
  var pbText;

  var hint = new paper.Raster('curve_hint');
  hint.position = paper.view.center;
  hint.scale(0.15);

  var pbSize = new paper.Size(400,14);
  var pbYOffset = -150;
  var pbOffset = new paper.Point(-pbSize.width / 2,pbYOffset -pbSize.height / 2);
  var pbRadius = pbSize.height / 2;
  var pbPoint = paper.view.center.add(pbOffset);
  var progressBarBack = new paper.Path.Rectangle(new paper.Rectangle(pbPoint, pbSize), pbRadius);
  progressBarBack.fillColor = 'lightGrey';

  var progressBarFront;
  function createFrontProgressBar(t){
    if(progressBarFront && progressBarFront.parent) {
      progressBarFront.remove();
    }
    var pbFrontSize = pbSize.clone();
    pbFrontSize.width *= t;
    progressBarFront = new paper.Path.Rectangle(new paper.Rectangle(pbPoint, pbFrontSize), pbRadius);
    progressBarFront.fillColor = 'magenta';
  }

  //var progressBarFront = progressBarBack.clone();
  //progressBarFront.fillColor = 'magenta';
  //progressBarFront.scale(t, 1, pbPoint);

  function inverseRemove(thing) {
    paper.project.activeLayer.addChild(thing);
  }

  function updatePathProgress(path, t) {
    path1?.remove();
    path2?.remove();
    inverseRemove(path);

    path1 = path.clone();
    path.remove();

    path2 = path1.splitAt(path.length*t);
    if(path2)  {
      path2.strokeColor = 'lightGrey';
      path2.strokeWidth =3;
    }
    path1.strokeWidth =5;

    if(!path1.lastSegment) return;
    var splitPoint = path1.lastSegment.point;
    var curveCoordinates = splitPoint.subtract(paper.view.center).divide(40.0);

    if(!circle || !circle.parent) {
      circle = new paper.Path.Circle({
        radius:8,
        fillColor: 'white',
        strokeColor: path1.strokeColor,
        strokeWidth:5
      });
    }
    else circle.bringToFront();

    if(!text || !text.parent) {
      text = new paper.PointText({
        fontSize: 16,
        fillColor: path1.strokeColor,
        fontWeight: 'bold'
      });
    }
    else text.bringToFront();
    
    if(!pbText || !pbText.parent) {
      pbText = text.clone();
    }
    
    circle.position = (splitPoint);
    
    text.content = curveCoordinates.x.toFixed(1)+"|"+curveCoordinates.y.toFixed(1);
    var offset = new paper.Point(20,-20);
    text.position = (splitPoint.add(offset));

    createFrontProgressBar(t);
    progressBarFront.fillColor = path1.strokeColor;
    
    pbText.content = t.toFixed(2);
    var pbBounds = progressBarFront.bounds;
    offset = new paper.Point(0,-15);
    pbText.position = pbBounds.topRight.add(offset);

    paper.view.draw();
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
  path = new paper.Path("M789.685,250.634C789.685,250.634 765.646,255.323 747.727,296.903C729.807,338.484 719.318,356.84 719.755,368.204C720.192,379.567 721.066,386.123 710.576,390.057C705.356,392.015 678.056,402.303 598.425,403.13C541.708,403.72 482.371,407.638 476.748,408.414C464.073,410.162 456.206,420.651 447.028,426.333C437.849,432.015 428.234,435.074 415.559,440.756C402.884,446.438 378.846,455.179 370.105,439.008C361.363,422.837 360.489,398.798 362.237,379.567C363.986,360.337 362.237,349.847 333.828,355.966C305.419,362.085 273.514,344.602 267.395,338.921C261.276,333.239 268.706,327.557 263.024,324.498C257.342,321.438 240.297,313.134 240.297,313.134");
  path.scale(0.9);
  path.strokeCap = 'round';
  path.reverse();
  path.translate(new paper.Point(-50,-100));
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
    hint.remove();

    pathDone = false;
    progressSelected = false;

    removeAllOldStuff();

    path = new paper.Path();
    path.strokeColor = paper.Color.random();
    path.strokeCap = 'round';
  }

  tool.onMouseDrag = function(event) {
    if(progressSelected) {
      t = Math.min(1.0, Math.max(0.0, event.point.x-pbPoint.x)/pbSize.width);
      //if(path) updatePathProgress(path);
      return;
    }
    path.add(event.point);
    
    paper.view.draw();
  }

  tool.onMouseUp = function(event){
    if(progressSelected) {
      return;
    }
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
  paper.project.activeLayer.onFrame = function (event) {
    var delta = t - progressT;
    progressT += delta /20;
    if(Math.abs(progressT - t)<0.0001) progressT = t;
    if(pathDone) updatePathProgress(path, progressT);
  }
}