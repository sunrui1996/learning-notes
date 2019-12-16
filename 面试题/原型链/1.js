function Fn() {
  this.x = 100;
  this.y = 200;
  this.getX = function () {
    console.log(this.x);
  }
}

Fn.prototype = {
  y: 400,
  getX: function () {
    console.log(this.x);
  },
  getY: function () {
    console.log(this.y);
  },
  sum: function () {
    console.log(this.x + this.y);
  }
};
var f1 = new Fn();
var f2 = new Fn();

console.log(f1.getX === f2.getX); // false
console.log(f1.getY === f2.getY); // true
console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(f1.__proto__.getX === f2.getX); // false
console.log(f1.getX === Fn.prototype.getX); // false

// 由于constructor不在f1中，所以向上查找原型链
// 由于Fn.prototype被重新赋值了，没有constructor属性，所以继续向上查找
// 在Object.prototype中找到了constructor，即Object
console.log(f1.constructor); // Object

console.log(Fn.prototype.__proto__.constructor); // Object
f1.getX(); // 100
f1.__proto__.getX(); // undefined
f2.getY(); // 200
Fn.prototype.getY(); // 400
f1.sum(); // 300
Fn.prototype.sum(); // NaN
