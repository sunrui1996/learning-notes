(function () {
  var banner = document.getElementById("banner");
  var inner = utils.getElementsByClass("inner")[0];
  var ul = utils.getElementsByClass("bannerTip")[0];
  var oLis = ul.getElementsByTagName("li");
  var imgList = inner.getElementsByTagName("img");
  var btnLeft = utils.getElementsByClass("btnLeft")[0];
  var btnRight = utils.getElementsByClass("btnRight")[0];
  var interval = 2500;
  var speed = 400;

  // 动态绑定数据
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "js/data.json", false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
      var data = utils.formatJSON(xhr.responseText);
    }

    var str = "";

    if (data) {
      // 绑定轮播图
      for (var i = 0; i < data.length; i++) {
        str += '<div><img src="" data-src="' + data[i].src + '" alt="' + data[i].desc + '"></div>';
      }

      str += '<div><img src="" data-src="' + data[0].src + '" alt="' + data[0].desc + '"></div>';
      inner.innerHTML = str;
      utils.css(inner, "width", imgList.length * 800);
      // 绑定焦点
      str = "";

      for (i = 0; i < imgList.length - 1; i++) {
        i === 0 ? str += '<li class="select"></li>' : str += '<li></li>';
      }

      ul.innerHTML = str;
    }
  };
  xhr.send();

  // 图片懒加载
  function loadImg() {
    for (var i = 0; i < imgList.length; i++) {
      (function (i) {
        var curImg = imgList[i];
        var oImg = new Image();

        oImg.src = curImg.getAttribute("data-src");
        oImg.onload = function () {
          curImg.src = this.src;
          curImg.style.display = "block";
          oImg = null;
          utils.move(curImg, {opacity: 1}, speed);
        };
      })(i);
    }
  }

  setTimeout(loadImg, 500);

  // 自动轮播
  // 当前图片索引
  var step = 0;
  var timer = setInterval(autoMove, interval);

  function autoMove() {
    if (step === oLis.length) {
      step = 0;
      utils.css(inner, "left", 0);
      utils.addClass(oLis[0], "select");
    }

    step += 1;
    utils.move(inner, {left: step * -800}, speed);
    changeTip();
  }

  // 焦点对齐
  function changeTip() {
    var tip = step === oLis.length ? 0 : step;

    for (var i = 0; i < oLis.length; i++) {
      var curLi = oLis[i];
      i === tip ? utils.addClass(curLi, "select") : utils.removeClass(curLi, "select");
    }
  }

  // 停止和开启自动轮播
  banner.onmouseover = function () {
    clearInterval(timer);
    btnLeft.style.display = "block";
    btnRight.style.display = "block";
  };
  banner.onmouseout = function () {
    timer = setInterval(autoMove, interval);
    btnLeft.style.display = "none";
    btnRight.style.display = "none";
  };

  // 点击焦点实现轮播图切换
  for (var i = 0; i < oLis.length; i++) {
    oLis[i].index = i;
    oLis[i].onclick = function () {
      step = this.index;
      changeTip();
      utils.move(inner, {left: step * -800}, speed);
    }
  }

  // 点击按钮实现轮播图左右切换
  btnLeft.onclick = function () {
    if (step === 0) {
      step = oLis.length;
      utils.css(inner, "left", oLis.length * -800);
    }

    step -= 1;
    changeTip();
    utils.move(inner, {left: step * -800}, speed);
  };
  btnRight.onclick = function () {
    if (step === oLis.length) {
      step = 0;
      utils.css(inner, "left", 0);
    }
    step += 1;
    changeTip();
    utils.move(inner, {left: step * -800}, speed);
  };
})();
