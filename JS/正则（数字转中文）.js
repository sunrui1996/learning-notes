var str = "20180213";
var arr = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

str = str.replace(/\d/g, function () {
  return arr[parseInt(arguments[0])];
});
console.log(str);
