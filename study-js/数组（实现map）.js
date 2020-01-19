Array.prototype.myMap = function (fn, context) {
  var arr = Array.prototype.slice.call(this);
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    result.push(fn.call(context, arr[i], i, this));
  }

  return result;
};
