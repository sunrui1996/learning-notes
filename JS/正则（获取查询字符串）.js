var str = "https://github.com/sunrui0217/learning-notes?a=1&b=2";
var obj = {};

str.replace(/([^?=&]+)=([^?=&]+)/g, (...args) => obj[args[1]] = args[2]);
console.log(obj);
