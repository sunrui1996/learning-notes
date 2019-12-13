(function () {
  // 处理DOM2级事件绑定的兼容性问题（绑定方法）
  function bind(curEle, eventType, eventFn) {
    if ("addEventListener" in document) {
      curEle.addEventListener("eventType", eventFn, false);
    } else {
      // 处理attachEvent的this兼容问题
      var tempFn = function () {
        eventFn.call(curEle);
      };
      tempFn.temp = eventFn;

      // 判断该自定义属性是否存在，不存在则创建一个
      // 由于不同事件可能绑定相同函数，所以需要给不同类型事件创建不同自定义属性
      if (!curEle["myBind" + eventType]) {
        // 由于需要存储多个被call后的方法，所以需要使用数组
        curEle["myBind" + eventType] = [];
      }

      var ary = curEle["myBind" + eventType];
      for (var i = 0; i < ary.length; i++) {
        // 如果当前传入的方法在之前已经添加过，则不再进行添加操作
        if (ary[i].temp === eventFn) return;
      }

      ary.push(tempFn);
      curEle.attachEvent("on" + eventType, tempFn);
    }
  }

  // 处理DOM2级事件移除的兼容性问题（移除方法）
  function unbind(curEle, eventType, eventFn) {
    if ("removeEventListener" in document) {
      curEle.removeEventListener(eventType, eventFn);
    } else {
      // 获取自定义属性中存储的类型为eventType的所有方法
      var ary = curEle["myBind" + eventType];
      for (var i = 0; i < ary.length; i++) {
        if (ary[i].temp === eventFn) {
          // 在自定义属性中将该方法移除
          ary.splice(i, 1);
          // 在事件池中将该方法移除
          curEle.detachEvent("on" + eventType, ary[i]);
          break;
        }
      }
    }
  }

  // 创建一个容器，并将需要给当前元素绑定的方法依次添加到容器中
  function on(curEle, eventType, eventFn) {
    if (!curEle["myEvent" + eventType]) {
      curEle["myEvent" + eventType] = [];
    }

    var ary = curEle["myEvent" + eventType];
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] === eventFn) return;
    }

    ary.push(eventFn);
    bind(curEle, eventType, run);
  }

  // 在容器中将某个方法移除
  function off(curEle, eventType, eventFn) {
    var ary = curEle["myEvent" + eventType];
    if (ary && ary instanceof Array) {
      for (var i = 0; i < ary.length; i++) {
        if (ary[i] === eventFn) {
          ary[i] = null;
          break;
        }
      }
    }
  }

  // 将run方法添加到浏览器自带的事件池中，在执行run方法的时候，run方法中会依次执行自己创建的容器中的方法
  function run(e) {
    e = e || window.event;
    var flag = e.target ? true : false;

    // 处理IE6-8兼容
    if (!flag) {
      e.target = e.srcElement;
      e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
      e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
      e.preventDefault = function () {
        e.returnValue = false;
      };
      e.stopPropagation = function () {
        e.cancelBubble = true;
      };
    }

    // 这里的this就是执行方法的当前元素
    var ary = this["myEvent" + e.type];
    for (var i = 0; i < ary.length; i++) {
      if (typeof ary[i] === "function") {
        ary[i].call(this, e);
      } else {
        ary.splice(i, 1);
        i--;
      }
    }
  }
})();
