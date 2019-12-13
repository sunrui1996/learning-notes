(function () {
  // 获取页面中所有具备data-place自定义属性的input
  var inputList = document.getElementsByTagName("input");
  var inputAry = [];
  for (var i = 0; i < inputList.length; i++) {
    var item = inputList[i];
    item.getAttribute("data-place") !== null ? inputAry.push(item) : null;
  }

  // 非IE浏览器，我们只需要把自定义属性值存放在placeholder属性中即可，浏览器可以根据这个属性做好提示的工作
  if (!/(MSIE|Trident)/i.test(navigator.userAgent)) { //标准浏览器
    for (var i = 0; i < inputAry.length; i++) {
      var item = inputAry[i];
      inputAry[i].placeholder = item.getAttribute("data-place");
    }
  } else { //IE浏览器
    for (var i = 0; i < inputAry.length; i++) {
      var item = inputAry[i];
      var inputText = item.getAttribute("data-place");
      item.placeholder = "";
      // 1、新创建一个span，将其存放在input的父节点的末尾（作为input的弟弟节点）
      // 2、给span设置一定的样式（相对于其父级元素定位，和input的基础样式类似）
      // 3、input或者span都要绑定相关事件行为：完成和内置placeholder相同的效果
      var span = documen.createElement("span");
      span.innerHTML = inputText;
      // 将需要设置的样式写在CSS中，此处直接添加此处直接添加样式类placeLike
      span.className = "placeLike";
      span.style.cursor = "text";
      item.parentNode.appendChild(span);

      // 把每个span的索引存储在其自定义属性上
      span.index = i;
      // 把span作为属性值存储在input的自定义属性上
      item.span = span;

      // span的点击行为：点击span让input获取对应光标
      span.onclick = function () {
        inputAry[this.index].focus();
      };

      // 控制input的输入行为（建议使用DOM2事件绑定：防止后期在其他地方也需要keyup或者keydown行为处理其他事情）
      item.onkeydown = item.onkeyup = function () {
        var value = this.value;
        var span = this.span;
        span.style.display = value.length > 0 ? "none" : "block";
      };
    }
  }
})();
