var foo = 'hello';

(function (foo) {
  console.log(foo);
  // 因为在形参赋值时已经声明foo了，所以此处foo的变量提升无效
  var foo = foo || 'world';
  console.log(foo);
})(foo);
console.log(foo);
// hello hello hello
