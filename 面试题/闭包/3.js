function fn(i) {
  return function (n) {
    console.log(n + i++);
  }
}

var f = fn(10);
f(20);
fn(20)(40);
fn(30)(50);
f(30);
// 30 60 80 41
