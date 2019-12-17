// JSON.stringify 的第二个参数是函数时，它有两个参数，键（key）和值（value）
// 会遍历传入的第一个参数，并对每一个属性值执行一次该函数

Object.prototype.myMap = function (fn) {
  if (typeof fn !== "function") throw new Error(`${fn} is not a function`);
  return JSON.parse(JSON.stringify(this, fn));
};

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};
let result = obj.myMap((key, value) => (value % 2 === 0) ? (value + 10) : value);
console.log(result);
