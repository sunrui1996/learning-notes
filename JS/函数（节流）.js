function throttle (fn, interval = 500) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    let context = this;
    setTimeout(() => {
      fn.apply(context, args);
      flag = true;
    }, interval);
  }
}
