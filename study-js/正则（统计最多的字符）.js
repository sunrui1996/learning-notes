var str = "zheshiyigeceshiyongdezifuchuan";
var obj = {};

str.replace(/[a-z]/gi, (...args) => {
  var key = args[0];
  obj[key] = obj[key] ? (obj[key] + 1) : 1;
  return key;
});

var max = Math.max.apply(null, Object.values(obj));
var arr = Object.entries(obj).filter(item => {
  return item[1] === max;
});

console.log("出现最多的字符是 " + arr.map(item => item[0]));
console.log(`出现了 ${max} 次`);
