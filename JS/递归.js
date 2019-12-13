// 使用递归编写代码：1~100之间，把所有能被 3 和 5 整除的数获取到，然后累加求和
function fn(num) {
  if (num > 100) return 0;
  if (num % 15 === 0) {
    return num + fn(num + 1);
  }
  return fn(num + 1);
}
console.log(fn(1));

// 使用递归编写代码：1~10以内的所有偶数乘积
function fn2(num) {
  if (num > 10) return 1;
  if (num % 2 === 0) return num * fn2(num + 1);
  return fn2(num + 1);
}
console.log(fn2(1));
