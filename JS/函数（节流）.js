function throttle (fn, interval = 500) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.call(this, ...args);
      flag = true;
    }, interval);
  }
}
