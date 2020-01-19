// call 继承 （无法继承父类原型对象中的方法）
function Parent1 () {
  this.name = "parent1";
}
function Child1 () {
  Parent1.call(this);
  this.childName = "child1";
}


// 原型链继承 （子类实例用的是同一个原型对象）
function Parent2 () {
  this.name = "parent2";
  this.play = [ 1, 2, 3 ];
}
function Child2 () {
  this.childName = "child2";
}
Child2.prototype = new Parent2();


// call + 原型链继承（父类构造函数会执行两次）
function Parent3 () {
  this.name = "parent3";
  this.play = [ 1, 2, 3 ];
}
function Child3 () {
  Parent3.call(this);
  this.childName = "child3";
}
Child3.prototype = new Parent3();


// 组合继承（子类实例的构造函数指向的是父类构造函数，应该指向子类构造函数才对）
function Parent4 () {
  this.name = "parent4";
  this.play = [ 1, 2, 3 ];
}
function Child4 () {
  Parent4.call(this);
  this.childName = "child4";
}
Child4.prototype = Parent4.prototype;


// 寄生组合继承（推荐使用）
function Parent5 () {
  this.name = "parent5";
  this.play = [ 1, 2, 3 ];
}
function Child5 () {
  Parent5.call(this);
  this.childName = "child5";
}
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;
