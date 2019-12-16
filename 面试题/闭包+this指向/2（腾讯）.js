function Fn() {
  this.a = 0;
  this.b = function () {
    console.log(this.a);
  }
}

Fn.prototype = {
  b: function () {
    this.a = 20;
    console.log(this.a);
  },
  c: function () {
    this.a = 30;
    console.log(this.a);
  }
};

var my_fn = new Fn();
my_fn.b();
my_fn.c();
// 0 30
