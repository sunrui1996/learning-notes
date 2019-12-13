// 首先获取所有客户信息，完成页面数据绑定
var oList = document.getElementById("list");

// 单例模式
var customModule = (function () {
  // 绑定数据
  function bindHTML(data) {
    var str = "";

    for (var i = 0; i < data.length; i++) {
      var curData = data[i];

      str += '<li>';
      str += '<span class="w50">' + curData.id + '</span>';
      str += '<span class="w150">' + curData.name + '</span>';
      str += '<span class="w50">' + curData.age + '</span>';
      str += '<span class="w200">' + curData.phone + '</span>';
      str += '<span class="w200">' + curData.address + '</span>';
      str += '<span class="w150 control">';
      str += '<a href="./add.html?id=' + curData.id + '">修改</a>';
      str += '<a href="javascript:;" customId="' + curData.id + '">删除</a>';
      str += '</span>';
      str += '</li>';
    }
    oList.innerHTML = str;
  }

  // 删除数据
  function removeCustom() {
    oList.onclick = function (e) {
      e = e || window.event;
      var target = e.target || e.srcElement;
      var tarTag = target.tagName;

      if (tarTag === "A" && target.innerText === "删除") {
        // window.confirm：确认提示框，如果flag为true，说明点击的是确认按钮，反之点击的是取消按钮
        var customId = target.getAttribute("customId");
        var flag = window.confirm("确定要删除编号为 [" + customId + "] 的客户吗");

        if (flag) {
          ajax({
            url: "http://localhost:2333/removeInfo?id=" + customId,
            success: function (jsonData) {
              if (jsonData && jsonData.code === 0) {
                oList.removeChild(target.parentNode.parentNode);
              } else {
                alert(jsonData.msg);
              }
            }
          });
        }
      }
    };
  }

  function init() {
    // 发送AJAX获取数据
    ajax({
      url: "http://localhost:2333/getList",
      success: function (jsonData) {
        if (jsonData && jsonData.code === 0) {
          var data = jsonData.data;
          bindHTML(data);
          removeCustom();
        }
      }
    });
  }

  return {
    init: init
  };
})();

customModule.init();
