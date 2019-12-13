function bubleSort(arr) {
  let result = [...arr]; // 不改变原数组

  let len = result.length;
  for (var i = 0; i < len - 1; i++) { // 最后一项是最大值，无须比较
    for (var j = 0; j < len - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  return result;
}

console.log(bubleSort([ 20, 18, 27, 19, 35 ]));
