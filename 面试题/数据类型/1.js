var arr = [1, 2, 3, 4];

function fn(arr) {
  arr[0] = 0;
  arr = [0];
  arr[0] = 100;
  return arr;
}

var res = fn(arr);
console.log(arr, res);
// [ 0, 2, 3, 4 ] [ 100 ]
