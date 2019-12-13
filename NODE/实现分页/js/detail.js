String.prototype.queryURLParameter = function () {
  var obj = {};
  var reg = /([^?&=#]+)=([^?&=#]+)/g;

  this.replace(reg, function () {
    obj[arguments[1]] = arguments[2];
  });

  return obj;
};

var box = document.getElementById("box2");
var studentId = window.location.href.queryURLParameter().id || Math.ceil(Math.random() * 100);
var str = "";

ajax({
  url: "http://localhost:2333/getInfo?id=" + studentId,
  success: function (jsonData) {
    if (jsonData && jsonData.code === 0) {
      var data = jsonData.data;
      var { id, name, sex, score } = data;

      str += `<li><span>编号</span><span>${id}</span></li>`;
      str += `<li><span>姓名</span><span>${name}</span></li>`;
      str += `<li><span>性别</span><span>${sex === 0 ? '男' : '女'}</span></li>`;
      str += `<li><span>成绩</span><span>${score}</span></li>`;

      box.innerHTML = str;
    }
  }
});
