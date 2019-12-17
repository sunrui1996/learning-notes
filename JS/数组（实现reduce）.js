Array.prototype.myReduce = function (fn, initialValue) {
  var arr = Array.prototype.slice.call(this);
  var result = initialValue || arr[0];
  var startIndex = initialValue ? 0 : 1;

  for (var i = startIndex; i < arr.length; i++) {
    result = fn.call(null, result, arr[i], i, this);
  }

  return result;
};
