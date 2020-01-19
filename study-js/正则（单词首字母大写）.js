var str = "this is a test";

str = str.replace(/\b[a-z]/g, function () {
  return arguments[0].toUpperCase();
});
console.log(str);
