function quickSort (arr) {
  let result = [...arr]; // 不改变原数组

  if (result.length <= 1) return result;
  let left = [];
  let right = [];
  let middle = result.splice(0, 1);

  for (var i = 0; i < result.length; i++) {
    let cur = result[i];
    if (cur < middle) {
      left.push(cur);
    } else {
      right.push(cur);
    }
  }

  return quickSort(left).concat(middle, quickSort(right));
}

console.log(quickSort([ 20, 18, 27, 19, 35 ]));
