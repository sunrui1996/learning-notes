let url = "https://github.com/sunrui1996/learning-notes?wd=javascript&rsv_spt=1";

function queryUrlParmeter(url) {
  let obj = {};
  let queryIndex = url.indexOf('?');
  if (queryIndex === -1) return obj;
  url = url.slice(queryIndex + 1);
  let arr = url.split('&');
  for (let i = 0; i < arr.length; i++) {
    let curArr = arr[i].split('=');
    obj[curArr[0]] = curArr[1];
  }
  return obj;
}

console.log(queryUrlParmeter(url));
