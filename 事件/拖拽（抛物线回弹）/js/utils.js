var utils = (function() {
  // standard 为 true 则说明是非 IE6-8
  var standard = "getComputedStyle" in window;

  // 检测传入的属性是否是该对象的公有属性
  Object.prototype.hasPublicProperty = function(attr) {
    return (attr in this) && !this.hasOwnProperty(attr);
  };

  // 将类数组转换为数组
  function likeToArray(likeAry) {
    if (standard) return Array.prototype.slice.call(likeAry);
    var ary = [];
    for (var i = 0; i < likeAry.length; i++) {
      ary[ary.length] = likeAry[i];
    }
    return ary;
  }

  // 将JSON格式字符串转换为JSON格式对象
  function formatJSON(jsonStr) {
    return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
  }

  // 获取 curEle 的 attr 的样式值
  function getCss(curEle, attr) {
    var val = null,
      reg = null;
    if (standard) {
      val = window.getComputedStyle(curEle, null)[attr];
    } else {
      // 处理IE6-8透明度问题
      if (attr === "opacity") {
        val = curEle.currentStyle["filter"];
        reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
        val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
      } else {
        val = curEle.currentStyle[attr];
      }
    }
    // 去单位
    reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
    return reg.test(val) ? parseFloat(val) : val;
  }

  // 设置 curEle 的 attr 的样式值
  function setCss(curEle, attr, value) {
    // 处理透明度的兼容
    if (attr === "opacity") {
      curEle.style.opacity = value;
      curEle.style.filter = "alpha(opacity=" + value * 100 + ")";
      return;
    }
    // 处理浮动的兼容
    if (attr === "float") {
      curEle.style.cssFloat = value;
      curEle.style.styleFloat = value;
      return;
    }
    // 为传入部分 value 自动加上单位
    var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
    if (reg.test(attr)) {
      if (!isNaN(value)) value += "px";
    }
    curEle.style[attr] = value;
  }

  // 批量设置 curEle 的样式值（group 是一个对象，保存了要设置的属性名和属性值）
  function setGroupCss(curEle, group) {
    if (Object.prototype.toString.call(group) !== "[object Object]") return;
    for (var key in group) {
      if (group.hasOwnProperty(key)) {
        setCss(curEle, key, group[key]);
      }
    }
  }

  // 可以获取、单独设置、批量设置 curEle 的样式值
  function css(curEle) {
    var length = arguments.length;
    if (length === 2) {
      if (typeof arguments[1] === "string") return getCss.apply(this, arguments);
      setGroupCss.apply(this, arguments);
    } else if (length === 3) {
      setCss.apply(this, arguments);
    }
  }

  // 获取 curEle 距 body 的上偏移和左偏移
  function offset(curEle) {
    var left = null,
      top = null,
      parent = curEle.offsetParent;
    left += curEle.offsetLeft;
    top += curEle.offsetTop;
    while (parent) {
      // IE8 下的 offsetLeft 和 offsetTop 属性包含了边框的宽度
      // 如果不是标准的 IE8 浏览器则进行边框累加
      if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        // 累加父级参照物的边框
        left += parent.clientLeft;
        top += parent.clientTop;
      }
      // 累加父级参照物本身的偏移
      left += parent.offsetLeft;
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {
      left: left,
      top: top
    };
  }

  // 获取浏览器盒子模型的 attr 属性的值 （或设置 attr 属性的值为 value）
  function win(attr, value) {
    // 获取属性
    if (typeof value === "undefined") {
      return document.documentElement[attr] || document.body[attr];
    }
    // 设置属性
    document.documentElement[attr] = value;
    document.body[attr] = value;
  }

  // 获取 curEle 的上一个哥哥元素节点
  function prev(curEle) {
    if (standard) return curEle.previousElementSibling;
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) pre = pre.previousSibling;
    return pre;
  }

  // 获取 curEle 的下一个弟弟元素节点
  function next(curEle) {
    if (standard) return curEle.nextElementSibling;
    var next = curEle.nextSibling;
    while (next && next.nodeType !== 1) next = next.nextSibling;
    return next;
  }

  // 获取 curEle 的所有哥哥元素节点
  function prevAll(curEle) {
    var ary = [],
      pre = this.prev(curEle);
    while (pre) {
      ary.unshift(pre);
      pre = this.prev(pre);
    }
    return ary;
  }

  // 获取 curEle 的所有弟弟元素节点
  function nextAll(curEle) {
    var ary = [],
      next = this.next(curEle);
    while (next) {
      ary.push(next);
      next = this.next(next);
    }
    return ary;
  }

  // 获取 curEle 相邻的两个元素节点
  function sibling(curEle) {
    var ary = [],
      pre = this.prev(curEle),
      next = this.next(curEle);
    pre ? ary.push(pre) : null;
    next ? ary.push(next) : null;
    return ary;
  }

  // 获取 curEle 所有的兄弟元素节点
  function siblings(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));
  }

  // 获取 curEle 索引
  function index(curEle) {
    return this.prevAll(curEle).length;
  }

  // 获取 cueEle 中所有元素子节点（可对标签名为 tagName 的节点进行二次筛选）
  function children(curEle, tagName) {
    var ary = [];
    if (!standard) {
      var nodeList = curEle.childNodes;
      for (var i = 0; i < nodeList.length; i++) {
        var curNode = nodeList[i];
        if (curNode.nodeType === 1) ary[ary.length] = curNode;
      }
    } else {
      ary = this.likeToArray(curEle.children);
    }
    // 二次筛选
    if (typeof tagName === "string") {
      var result = [];
      for (var i = 0; i < ary.length; i++) {
        var curEleNode = ary[i];
        if (curEleNode.tagName === tagName.toUpperCase()) {
          result[result.length] = curEleNode;
        }
      }
      ary = result;
      nodeList = result = null;
    }
    return ary;
  }

  // 获取 curEle 的第一个元素子节点
  function firstChild(curEle) {
    var children = this.children(curEle);
    return children.length > 0 ? children[0] : null;
  }

  // 获取 curEle 的对后一个元素子节点
  function lastChild(curEle) {
    var children = this.children(curEle),
      length = children.length;
    return length > 0 ? children[length - 1] : null;
  }

  // 向 container 的末尾追加 newEle
  function append(newEle, container) {
    container.appendChild(newEle);
  }

  // 向 container 的开头追加 newEle
  function prepend(newEle, container) {
    var first = this.firstChild(container);
    if (first) {
      container.insertBefore(newEle, first);
    } else {
      container.appendChild(newEle);
    }
  }

  // 向 oldEle 前面追加 newEle
  function insertBefore(newEle, oldEle) {
    oldEle.parentNode.insertBefore(newEle, oldEle);
  }

  // 向 oldEle 后面追加 newEle
  function insertAfter(newEle, oldEle) {
    var next = this.next(oldEle);
    if (next) {
      oldEle.parentNode.insertBefore(newEle, next);
    } else {
      oldEle.parentNode.appendChild(newEle);
    }
  }

  // 给 curEle 添加 className
  function addClass(curEle, className) {
    var ary = className.split(/ +/g);
    for (var i = 0; i < ary.length; i++) {
      if (!this.hasClass(curEle, className)) curEle.className += " " + className;
    }
  }

  // 删除 curEle 的 className
  function removeClass(curEle, className) {
    var ary = className.split(/ +/g);
    for (var i = 0; i < ary.length; i++) {
      var curName = ary[i];
      if (this.hasClass(curEle, curName)) {
        var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
        curEle.className = curEle.className.replace(reg, " ");
      }
    }
  }

  // 验证 curEle 中是否存在 className
  function hasClass(curEle, className) {
    var reg = new RegExp("(^| +)" + className + "( +|$)");
    return reg.test(curEle.className);
  }

  // 获取 context 中类名包含 className 的元素集合
  function getElementsByClass(className, context) {
    context = context || document;
    if (standard) return this.likeToArray(context.getElementsByClassName(className));
    var classNameAry = className.replace(/(^ +| +$)/g, "").split(/ +/g),
      ary = [],
      nodeList = context.getElementsByTagName("*");
    for (var i = 0, len = nodeList.length; i < len; i++) {
      var curNode = nodeList[i];
      var flag = true;
      for (var j = 0; j < classNameAry.length; j++) {
        // 如果 curNode 不是包含 classNameAry 中的所有类名，则将 flag 赋值为 false，并跳出当前循环
        if (!this.hasClass(curNode, classNameAry[j])) {
          flag = false;
          break;
        }
      }
      if (flag) ary[ary.length] = curNode;
    }
    return ary;
  }

  // 选项卡封装
  function tabChange(container, defaultIndex) {
    var ul = utils.firstChild(container),
      oLis = utils.children(ul),
      oDivs = utils.children(container, "div");
    // 处理默认选中项
    defaultIndex = defaultIndex || 0;
    utils.addClass(oLis[defaultIndex], "select");
    utils.addClass(oDivs[defaultIndex], "select");

    // 事件委托
    ul.onclick = function(e) {
      e = e || window.event;
      e.target = e.target || e.srcElement;
      if (e.target.tagName === "LI") {
        // 获取当前点击 li 的索引
        var index = utils.index(e.target);
        // 处理 li 和 div
        for (var i = 0; i < oLis.length; i++) {
          if (i === index) {
            utils.addClass(oLis[i], "select");
            utils.addClass(oDivs[i], "select");
          } else {
            utils.removeClass(oLis[i], "select");
            utils.removeClass(oDivs[i], "select");
          }
        }
      }
    }
  }

  // 运动动画封装
  function move(curEle, target, duration, callBack) {
    var begin = {},
      change = {},
      curPos = {},
      time = 0;
    for (var key in target) {
      if (target.hasOwnProperty(key)) {
        begin[key] = utils.css(curEle, key);
        change[key] = parseFloat(target[key]) - begin[key];
      }
    }
    _move();

    function _move() {
      clearTimeout(curEle.timer);
      time += 10;
      if (time >= duration) {
        utils.css(curEle, target);
        clearTimeout(curEle.timer);
        callBack && callBack.call(curEle);
        return;
      } else {
        for (var key in begin) {
          if (begin.hasOwnProperty(key)) {
            curPos[key] = begin[key] + change[key] / duration * time;
          }
        }
        utils.css(curEle, curPos);
      }
      curEle.timer = setTimeout(_move, 10);
    }
  }

  // 绑定事件
  function on(curEle, eventType, eventFn) {
    if (/^self/.test(eventType)) { // 处理自定义事件
      if (!curEle[eventType]) {
        curEle[eventType] = [];
      }
      var ary = curEle[eventType];
      for (var i = 0; i < ary.length; i++) {
        if (ary[i] === eventFn) return;
      }
      a.push(eventFn);
    } else { // 处理浏览器自带事件
      if ("addEventListener" in document) { // 标准浏览器处理方案
        curEle.addEventListener(eventType, eventFn, false);
      } else { // IE6-8处理方案
        if (!curEle["myBind" + eventType]) {
          curEle["myBind" + eventType] = [];
          curEle.attachEvent("on" + eventType, function() {
            run.call(curEle);
          });
        }
        var ary = curEle["myBind" + eventType];
        for (var i = 0; i < ary.length; i++) {
          if (ary[i] === eventFn) return;
        }
        ary.push(eventFn);
      }
    }

    // 处理IE6-8系统事件
    function run() {
      var e = window.event,
        eventType = e.type,
        ary = this["myBind" + eventType];
      e.target = e.srcElement;
      e.stopPropagation = function() {
        e.cancelBubble = true;
      };
      e.preventDefault = function() {
        e.returnVale = false;
      };
      e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
      e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;

      for (var i = 0; i < ary.length; i++) {
        if (typeof ary[i] === "function") {
          ary[i].call(this, e);
        } else {
          ary.splice(i, 1);
          i--;
        }
      }
    }

    // 处理自定义事件
    function fire(selfType, e) {
      var ary = this[selfType];
      if (ary) {
        for (var i = 0; i < ary.length; i++) {
          if (typeof ary[i] === "function") {
            ary[i].call(this, e);
          } else {
            ary.splice(i, 1);
            i--;
          }
        }
      }
    }
  }

  // 移除事件
  function off(curEle, eventType, eventFn) {
    if (/^self/.test(eventType)) {
      var ary = curEle[type];
      if (ary) {
        for (var i = 0; ary.length; i++) {
          if (ary[i] === eventFn) {
            ary[i] = null;
            break;
          }
        }
      }
    } else {
      if ("removeEventListener" in document) {
        curEle.removeEventListener(eventType, eventFn, false);
      } else {
        var ary = curEle["myBind" + eventType];
        if (ary && ary instanceof Array) {
          for (var i = 0; i < ary.length; i++) {
            if (ary[i] === eventFn) {
              ary[i] = null;
              break;
            }
          }
        }
      }
    }
  }

  return {
    likeToArray: likeToArray,
    formatJSON: formatJSON,
    css: css,
    offset: offset,
    win: win,
    prev: prev,
    next: next,
    prevAll: prevAll,
    nextAll: nextAll,
    sibling: sibling,
    siblings: siblings,
    index: index,
    children: children,
    firstChild: firstChild,
    lastChild: lastChild,
    append: append,
    prepend: prepend,
    insertBefore: insertBefore,
    insertAfter: insertAfter,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    getElementsByClass: getElementsByClass,
    tabChange: tabChange,
    move: move,
    on: on,
    off: off
  };
})();
