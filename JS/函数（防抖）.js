const debounce = (fn, delay = 200) => {
  let timerId = null;
  return function (...args) {
    let context = this;
    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
