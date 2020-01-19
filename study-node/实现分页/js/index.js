var pageModule = (function () {
  // 获取需要操作的DOM元素
  var content = document.getElementById("content");
  var page = document.getElementById("page");
  var pageNum = document.getElementById("pageNum");
  var numInput = document.getElementById("numInput");

  // 当前页、总页数、本次请求回来的数据
  var curPage = 1;
  var total = 0;
  var data = null;

  // 绑定数据
  function bindHTML() {
    var str = "";
    for (var i = 0; i < data.length; i++) {
      var curData = data[i];
      str += '<li studentId="' + curData.id + '">';
      str += '<span>' + curData.id + '</span>';
      str += '<span>' + curData.name + '</span>';
      str += '<span>' + (curData.sex === 0 ? "男" : "女") + '</span>';
      str += '<span>' + curData.score + '</span>';
      str += '</li>';
    }
    content.innerHTML = str;

    str = "";
    for (i = 1; i <= total; i++) {
      if (i === curPage) {
        str += '<li class="select">' + i + '</li>';
        continue;
      }
      str += '<li>' + i + '</li>';
    }
    pageNum.innerHTML = str;

    numInput.value = curPage;
  }

  // 事件委托实现分页区域按钮操作
  function bindEvent() {
    page.onclick = function (e) {
      e = e || window.event;
      var tar = e.target || e.srcElement;
      var tarTag = tar.tagName;
      var tarInner = tar.innerHTML;

      if (tarTag === "SPAN") {
        if (tarInner === "FIRST") {
          if (curPage === 1) return;
          curPage = 1;
        } else if (tarInner === "PREV") {
          if (curPage === 1) return;
          curPage--;
        } else if (tarInner === "NEXT") {
          if (curPage === total) return;
          curPage++;
        } else if (tarInner === "LAST") {
          if (curPage === total) return;
          curPage = total;
        }
      } else if (tarTag === "LI") {
        if (curPage === tarInner) return;
        curPage = parseFloat(tarInner);
      } else if (tarTag === "INPUT") return;

      sendAJAX();
    };

    numInput.onkeyup = function (e) {
      e = e || window.event;
      if (e.keyCode === 13) {
        var val = parseFloat(this.value.replace(/^ +| +$/, ""));

        if (isNaN(val)) {
          this.value = curPage;
          return;
        } else {
          curPage = val < 1 ? 1 : (val > total ? total : val);
        }
        sendAJAX();
      }
    }
  }


  // content区域的li跳转事件
  function bindLink() {
    var oLis = content.getElementsByTagName("li");

    for (var i = 0; i < oLis.length; i++) {
      oLis[i].onclick = (function (i) {
        return function () {
          // 在新窗口打开
          window.open("detail.html?id=" + this.getAttribute("studentId"));
        };
      })(i);
    }
  }

  // 发送AJAX请求
  function sendAJAX() {
    ajax({
      url: "http://localhost:2333/getList?n=" + curPage,
      success: function (jsonData) {
        if (jsonData && jsonData.code === 0) {
          total = jsonData.total;
          data = jsonData.data;
          bindHTML();
          bindLink();
        }
      }
    });
  }

  // 模块入口
  function init() {
    sendAJAX();
    bindEvent();
  }

  return {
    init: init
  };
})();

pageModule.init();
