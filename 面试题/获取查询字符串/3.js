let url = "https://github.com/sunrui1996/learning-notes?wd=javascript&rsv_spt=1";

function queryUrlParmeter(url) {
  let obj = {};
  let reg = /([^?&=]+)=([^&=]+)/g;
  url.replace(reg, (...arg) => obj[arg[1]] = arg[2]);
  return obj;
}

console.log(queryUrlParmeter(url));
