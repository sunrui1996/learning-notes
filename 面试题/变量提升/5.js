var a = 10, b = 11, c = 12;

function test(a) {
  a = 1;
  var b = 2;
  c = 3;
}

test(10);
console.log(a, b, c);
// 10 11 3
