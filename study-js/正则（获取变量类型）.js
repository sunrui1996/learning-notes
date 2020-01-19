function getVariableType(variable) {
  var reg = /\[object (\S+)\]/;
  return Object.prototype.toString.call(variable).match(reg)[1].toLowerCase();
}

var typeMap = {
  string: "a",
  number: 1,
  boolean: true,
  undefined: undefined,
  null: null,
  array: [1, 2],
  function: function () {},
  date: new Date(),
  regexp: new RegExp(),
  error: new Error(),
  symbol: Symbol()
};

for (var key in typeMap) {
  if (typeMap.hasOwnProperty(key)) {
    console.log(key, getVariableType(typeMap[key]));
  }
}
