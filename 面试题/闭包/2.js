var a = 9;

function fn() {
  a = 0;

  return function (b) {
    return b + a++;
  }
}

var f = fn();
console.log(f(5), fn()(5), f(5), a);
// 5 5 6 2
