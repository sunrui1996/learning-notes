(function (jQuery) {
  function banner(url, interval) {
    var $banner = $(this);
    var $bannerInner = $banner.children().first();
    var $bannerTip = $bannerInner.next();
    var $bannerLeft = $bannerTip.next();
    var $bannerRight = $bannerLeft.next();
    var $oAs = $banner.children("a");
    var $oDivs = null;
    var $imgList = null;
    var $oLis = null;

    interval = interval || 3000;
    var speed = 500;

    // 获取数据
    var jsonData = null;
    $.ajax({
      url: url + "?_=" + Math.random(),
      type: "GET",
      dataType: "json",
      async: false, //当前请求是同步的
      success: function (data) {
        jsonData = data;
      }
    });

    // 绑定数据
    bindData();

    function bindData() {
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
    setTimeout(loadImg, 500);

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

    // 自动轮播
    var step = 0;
    var timer = setInterval(autoMove, interval);

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

    // 控制轮播的停止和开启
    $banner.on("mouseover", function () {
      clearInterval(timer);
      $oAs.css("display", "block");
      // $bannerLeft.css("display", "block").next().css("display", "block");
    });
    $banner.on("mouseout", function () {
      timer = setInterval(autoMove, interval);
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

  // 扩展jQuery插件
  jQuery.fn.extend({
    banner: banner
  });
})(jQuery);
