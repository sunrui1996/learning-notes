console.log(a);
var a = 12;

function fn() {
  console.log(a);
  var a = 13;
}

fn();
console.log(a);
// undefined undefined 12
