// 方法一（常规去重法，会排序）
function unique(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let curArr = arr[i];
    if (result.indexOf(curArr) === -1) {
      result.push(curArr);
    }
  }
  return result;
}
let arr = [1, 4, 14, 11, 23, 1, 2, 2, 4];
console.log(unique(arr), "常规去重法");


// 方法二（前后比较法）
Array.prototype.unique2 = function () {
  let obj = {};
  for (let i = 0; i < this.length; i++) {
    let item = this[i];
    if (typeof obj[item] !== 'undefined') {
      // 用数组的最后一项替换当前项（相当于删除重复的当前项，然后用最后一项补位）
      this[i] = this[this.length - 1];
      // 删除数组的最后一项
      this.length--;
      // 解决数组塌陷问题
      i--;
      continue;
    }
    obj[item] = item;
  }
};
let arr2 = [1, 4, 14, 11, 23, 1, 2, 2, 4];
arr2.unique2();
console.log(arr2, "前后比较法");


// 方法三（对象去重法，会排序）
Object.prototype.values = function (obj) { // 兼容ie
  let result = [];
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) result.push(obj[key]);
  }
  return result;
};
function unique3(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let curArr = arr[i];
    obj[curArr] = curArr;
  }
  return Object.values(obj);
}
let arr3 = [1, 4, 14, 11, 23, 1, 2, 2, 4];
console.log(unique3(arr3), "对象去重法");


// 方法四（相邻去重法，会排序）
function unique4(arr) {
  arr = arr.sort((a, b) => a - b);
  let result = [];
  result.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) result.push(arr[i]);
  }
  return result;
}
let arr4 = [1, 4, 14, 11, 23, 1, 2, 2, 4];
console.log(unique4(arr4), "相邻去重法");


// 方法五（ES6方法）
function unique5(arr) {
  return [...new Set(arr)];
}
let arr5 = [1, 4, 14, 11, 23, 1, 2, 2, 4];
console.log(unique5(arr5), "ES6去重法");
