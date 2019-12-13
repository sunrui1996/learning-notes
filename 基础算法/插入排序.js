function insertSort(array) {
  let handAry = [];
  handAry.push(array[0]);
  for (let i = 1; i < array.length; i++) {
    let item = array[i];

    // 循环中的 handAry.length 是动态的，如果不提前将其赋值给一个变量，在执行 30 行代码时会增加其 length 值，从而陷入死循环
    let length = handAry.length;

    for (let j = 0; j < length; j++) {
      // 如果 item 比 handAry[j] 小，则将其添加到 handAry[j] 的前面
      if (item < handAry[j]) {
        handAry.splice(j, 0, item);
        break;
      }
      // 如果能执行到这，说明 item 比 handAry 中的所有值都大，则将其添加到 handAry 的末尾
      if (j === length - 1) {
        handAry.push(item);
      }
    }
  }
  return handAry;
}

let arr = [1, 4, 16, 2, 14, 21, 5];
console.log(insertSort(arr));
