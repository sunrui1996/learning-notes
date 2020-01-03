// 小 中 大
// 1  0  0      1
// 0  1  0      1
// 1  0  1      2
// 1  1  1      3
// 2  1  2      5
// 3  2  3      8
// 5  3  5      13

function fn(n) {
  if (n <= 2) {
    return 1;
  } else {
    return fn(n - 2) + fn(n - 1);
  }
}

console.log(fn(10));
