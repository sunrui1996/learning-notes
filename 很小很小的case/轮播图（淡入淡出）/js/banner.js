var $banner = $("#banner");
var $bannerInner = $banner.children().first();
var $bannerTip = $bannerInner.next();
var $bannerLeft = $bannerTip.next();
var $bannerRight = $bannerLeft.next();
var $oAs = $banner.children("a");
var $oDivs = null;
var $imgList = null;
var $oLis = null;

var interval = 2000;
var speed = 500;
var step = 0;
var timerId = null;

setTimeout(function () {
  bindData();
  setTimeout(loadImg, 500);
  initBanner();
  bindEvents();
}, 2000);

// 绑定数据
function bindData() {
  var jsonData = [
    { src: "images/1.jpg" },
    { src: "images/2.jpg" },
    { src: "images/3.jpg" },
    { src: "images/4.jpg" },
    { src: "images/5.jpg" },
    { src: "images/6.jpg" },
    { src: "images/7.jpg" }
  ];
  var str1 = "";
  var str2 = "";
  $.each(jsonData, function (index, item) {
    str1 += '<div><img src="" data-src="' + item.src + '"/></div>';
    index === 0 ? str2 += '<li class="select"></li>' : str2 += '<li></li>';
  });
  $bannerInner.html(str1);
  $bannerTip.html(str2);

  $oDivs = $bannerInner.children("div");
  $imgList = $bannerInner.find("img");
  $oLis = $bannerTip.children("li");
}

// 图片懒加载
function loadImg() {
  $imgList.each(function (index, item) {
    var oImg = new Image();
    oImg.src = $(this).attr("data-src"); // $(this) <=> $(item)
    oImg.onload = function () {
      $(item).prop("src", this.src).css("display", "block");
    }
  });
  $oDivs.first().css("zIndex", 1).animate({
    opacity: 1
  }, speed);
  $bannerInner.css("background", "rgba(173, 173, 173, .6)");
}

// 初始化轮播图
function initBanner() {
  timerId = setInterval(autoMove, interval);
}

// 自动轮播
function autoMove() {
  step += 1;
  step = step === $oDivs.length ? 0 : step;
  changeBanner();
}

// 轮播切换效果
function changeBanner() {
  $oDivs.eq(step).css("zIndex", 1).stop().animate({opacity: 1}, speed)
    .siblings().css("zIndex", 0).stop().animate({opacity: 0}, speed);
  $oLis.eq(step).addClass("select").siblings().removeClass("select");
}

// 绑定事件
function bindEvents() {
  // 控制轮播的停止和开启
  $banner.on("mouseover", function () {
    clearInterval(timerId);
    $oAs.css("display", "block");
    // $bannerLeft.css("display", "block").next().css("display", "block");
  });
  $banner.on("mouseout", function () {
    timerId = setInterval(autoMove, interval);
    $oAs.css("display", "none");
    // $bannerLeft.css("display", "none").next().css("display", "none");
  });

  // 焦点切换
  $oLis.on("click", function () {
    step = $(this).index();
    changeBanner();
  });

  // 左右切换
  $bannerLeft.on("click", function () {
    step = step === 0 ? $oDivs.length - 1 : step - 1;
    changeBanner();
  });
  $bannerRight.on("click", autoMove);
}
