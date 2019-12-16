var n = 0;

function a() {
  var n = 10; // 11

  function b() {
    n++;
    console.log(n);
  }

  b();
  return b;
}

var c = a();
c();
console.log(n);
// 11 12 0
