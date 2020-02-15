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
  var step = 0;
  var timerId = null;

  setTimeout(function() {
    bindData();
    setTimeout(loadImg, 500);
    initBanner();
    bindEvents();
  }, 2000);

  // 绑定数据
  function bindData() {
    var data = [
      {"src": "images/1.jpg"},
      {"src": "images/2.jpg"},
      {"src": "images/3.jpg"},
      {"src": "images/4.jpg"},
      {"src": "images/5.jpg"},
      {"src": "images/6.jpg"},
      {"src": "images/7.jpg"}
    ];
    var innerStr = "";
    var ulStr = "";

    // 绑定轮播图
    for (var i = 0; i < data.length; i++) {
      innerStr += '<div><img src="" data-src="' + data[i].src + '" alt="' + data[i].desc + '"></div>';
    }
    innerStr += '<div><img src="" data-src="' + data[0].src + '"></div>';
    inner.innerHTML = innerStr;
    utils.css(inner, "width", imgList.length * 800);

    // 绑定焦点
    for (i = 0; i < imgList.length - 1; i++) {
      i === 0 ? ulStr += '<li class="select"></li>' : ulStr += '<li></li>';
    }

    ul.innerHTML = ulStr;
  }

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

  // 初始化轮播图
  function initBanner() {
    timerId = setInterval(autoMove, interval);
  }

  // 自动轮播
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

  // 绑定事件
  function bindEvents() {
    // 停止和开启自动轮播
    banner.onmouseover = function () {
      clearInterval(timerId);
      btnLeft.style.display = "block";
      btnRight.style.display = "block";
    };
    banner.onmouseout = function () {
      timerId = setInterval(autoMove, interval);
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
  }
})();
