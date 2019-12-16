var a = 4;

function fn(x, y, a) {
  console.log(a);
  arguments[2] = 10;
  console.log(a);
}

a = fn(1, 2, 3);
console.log(a);
// 3 10 undefined
