var searchModule = (function () {
  var $search = $("#search");
  var $searchBox = $("#searchBox");

  // 向百度服务器发送JSONP请求，把数据获取到后绑定到容器中
  function bindHTML() {
    $.ajax({
      url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + $search.val(),
      dataType: "jsonp",
      jsonp: "cb",
      success: function callback(data) {
        data = data.s;
        var str = "";
        $.each(data, function (index, item) {
          if (index <= 3) {
            str += '<li>' + item + '</li>';
          }
        });
        if (str.length > 0) {
          $searchBox.html(str).show();
        }
      }
    });
  }

  // 事件绑定和模块的入口
  function init() {
    $search.on("focus keyup", function () {
      var val = $(this).val();
      if (val.length > 0) {
        bindHTML();
      } else {
        $searchBox.hide();
      }
    });

    // 事件委托
    $(document).on("click", function (e) {
      if (e.target.tagName === "LI" && e.target.parentNode.id === "searchBox") { // 如果点击的是li
        $search.val(e.target.innerHTML);
        $searchBox.hide();
      } else if (e.target.id === "search") { //如果点击的是文本框
        return;
      } else { //如果点击的是其他地方
        $searchBox.hide();
      }
    });
  }

  return {
    init: init
  };
})();

searchModule.init();
