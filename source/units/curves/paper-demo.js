
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

  var progressSelected = false;
  var pathDone = false;
  tool.onMouseDown = function(event){
    if(event.point.y < progressBarBack.bounds.bottom) {
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