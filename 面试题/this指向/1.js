var fullName = 'language';
var obj = {
  fullName: 'javascript',
  prop: {
    getFullName: function () {
      return this.fullName;
    }
  }
};
console.log(obj.prop.getFullName());
var test = obj.prop.getFullName;
console.log(test());
// undefined language
