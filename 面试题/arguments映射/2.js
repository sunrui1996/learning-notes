"use strict";
var a = 4;

function b(x, y, a) {
  console.log(a);
  // 严格模式下，arguments 和形参变量的映射关系被切断，相互之间互不干扰
  arguments[2] = 10;
  console.log(a);
}

a = b(1, 2, 3);
console.log(a);
// 3 3 undefined
