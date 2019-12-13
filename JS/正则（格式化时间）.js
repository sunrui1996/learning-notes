var date = new Date().toLocaleString();
var dateArr = date.split(/[-\/\s:]/g);
var template = "{0}年{1}月{2}日 {3}:{4}:{5}";

var result = template.replace(/{(\d)}/g, (...args) => {
  var value = dateArr[parseInt(args[1])];

  if (value.indexOf("午") !== -1) {
    var hours = value.slice(2);
    value = value[0] === "上" ? hours : (parseInt(hours) + 12);
  }

  return value.length === 1 ? ("0" + value) : value;
});
console.log(result);
