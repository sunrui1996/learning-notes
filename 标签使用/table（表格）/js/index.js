let oTab = document.getElementById("tab");
// 获取 tHead 的第一行中的所有列
let oThs = oTab.tHead.rows[0].cells;
let tBody = oTab.tBodies[0];
let oRows = tBody.rows;

// 一、首先获取后台（data.json）中的数据 => “JSON格式的字符串” => Ajax
// 1、首先创建一个Ajax对象
let xhr = new XMLHttpRequest();
// 2、打开我们需要请求数据的那个文件地址
xhr.open("Get", "data.json", true);
// 3、监听请求状态
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
    let response = JSON.parse(xhr.responseText);

    // 数据绑定
    (function () {
      let frag = document.createDocumentFragment();
      for (let i = 0; i < response.length; i++) {
        let tr = document.createElement('tr');
        let cur = response[i];
        for (key in cur) {
          if (key === 'sex') {
            cur[key] === 0 ? tr.innerHTML += '<td>男</td>' : tr.innerHTML += '<td>女</td>';
            break;
          }
          tr.innerHTML += '<td>' + cur[key] + '</td>';
        }
        frag.appendChild(tr);
      }
      tBody.appendChild(frag);
      frag = null;
    })();
  }
}
// 4、发送请求
xhr.send();

// 二、实现排序
function sort(index) {
  let that = this;
  oRows = Array.prototype.slice.call(oRows);

  // 点击当前列时初始化其他列的 flag 值
  for (let i = 0; i < oThs.length; i++) {
    if (i !== index) {
      oThs[i].flag = -1;
    }
  }

  // 对 oRows进行排序
  oRows.sort(function (a, b) {
    let curInner = a.cells[index].innerText;
    let nextInner = b.cells[index].innerText;
    let curInnerNum = parseFloat(curInner);
    let nextInnerNum = parseFloat(nextInner);

    // 判断进行比较的值能否转换成数字
    if (isNaN(curInnerNum) || isNaN(nextInnerNum)) return (curInner.localeCompare(nextInner)) * that.flag;
    return (curInnerNum - nextInnerNum) * that.flag;
  });
  that.flag *= -1;

  // 将排序后的 oRows 重新插入 tBody 中
  let frag = document.createDocumentFragment();
  for (let i = 0; i < oRows.length; i++) {
    frag.appendChild(oRows[i]);
  }
  tBody.appendChild(frag);
  frag = null;
}

// 三、绑定排序方法
for (let i = 0; i < oThs.length; i++) {
  let cur = oThs[i];
  cur.index = i;
  cur.flag = 1;

  // 为类名为 cursor 的 th 绑定点击事件
  if (cur.className === 'cursor') {
    cur.onclick = function () {
      sort.call(this, this.index);
    };
  }
}
