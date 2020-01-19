var str = "19960217"; // 19,960,217.

str = str.replace(/^(\d{1,3})((\d{3})+)$/g, function () {
  return arguments[1] + "," + arguments[2].replace(/\d{3}(?!$)/g, function () {
    return arguments[0] + ",";
  })
});
console.log(str);
