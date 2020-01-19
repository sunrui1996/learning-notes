(function () {
  // 实现AJAX请求的公共方法；当一个方法传递的参数值过多，而且还不固定，我们使用对象统一传值法（把需要传递的参数值都先放在一个对象中，一起传递进去即可）
  function ajax(options) {
    // 把需要使用的参数值设定一个规则和初始值
    var _default = {
      url: "", // 请求的地址
      type: "GET", // 请求的方式
      dataType: "json", // 设置请求回来的内容格式
      async: true, // 请求是同步还是异步
      data: null, // 放在请求主体中的内容（POST）
      getHead: null, // 当readyState===2时执行的回调方法
      success: null // 当readyState===4时执行的回调方法
    };

    // 使用用户传递进来的值覆盖默认值
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        _default[key] = options[key];
      }
    }

    if (_default.type.toUpperCase() === "GET") {
      _default.url.indexOf("?") === -1 ? _default.url += "?" : _default.url += "&";
      _default.url += "_=" + Math.random();
    }

    var xhr = new XMLHttpRequest();
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
      if (/^2\d{2}$/.test(xhr.status)) {
        // 想要在readyState等于2的时候做一些操作，需要保证AJAX是异步请求
        if (xhr.readyState === 2) {
          _default.getHead && _default.getHead.call(this);
        }

        if (xhr.readyState === 4) {
          var val = xhr.responseText;

          // 如果传递的参数值是json，说明获取的内容应该是JSON格式对象
          if (_default.dataType === "json") {
            val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
          }
          _default.success && _default.success.call(this, val);
        }
      }
    };
    xhr.send(_default.data);
  }

  window.ajax = ajax;
})();
