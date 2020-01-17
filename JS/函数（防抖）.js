const debounce = (fn, delay = 200) => {
  let timerId = null;
  return function (...args) {
    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
};
