let url = "https://github.com/sunrui0217/learning-notes?wd=javascript&rsv_spt=1";

function queryUrlParmeter(url) {
  let obj = {};
  let queryIndex = url.indexOf('?');
  if (queryIndex === -1) return obj;
  url = url.slice(queryIndex + 1);
  let arr = url.split(/[=|&]/g);
  for (let i = 0; i < arr.length; i += 2) {
    obj[arr[i]] = arr[i + 1];
  }
  return obj;
}

console.log(queryUrlParmeter(url));
