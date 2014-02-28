


var currentCodeFlower;
var createCodeFlower = function(json) {
  if (currentCodeFlower) currentCodeFlower.cleanup();
  var total = countElements(json);
  var _w = document.width;
  var _h = document.height;
  if(_w>_h){
    w = _h;h = _h;
  }else{
    w = _w;h = _w;
  }
  currentCodeFlower = new CodeFlower("#visualization", w*0.8, h*0.8).update(json);
};
d3.json('/data/tree', createCodeFlower);
