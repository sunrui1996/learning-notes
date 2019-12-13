String.prototype.queryURLParameter = function () {
  var obj = {};
  var reg = /([^?&=#]+)=([^?&=#]+)/g;

  this.replace(reg, function () {
    obj[arguments[1]] = arguments[2];
  });

  return obj;
};

var submit = document.getElementById("submit");
var userName = document.getElementById("userName");
var userAge = document.getElementById("userAge");
var userPhone = document.getElementById("userPhone");
var userAddress = document.getElementById("userAddress");

// 判断当前操作是修改还是增加：如果URL后面传递了ID就是修改，否则就是增加。如果是修改，加载页面的第一件事就是获取URL后面传进来的ID
var urlObj = window.location.href.queryURLParameter();
var customId = urlObj.id;
// 判断当前是什么操作，true代表修改，false代表增加
var flag = typeof customId !== "undefined";

// 如果是修改，首先需要把对应客户的信息获取到，并且增加到对应文本框中
if (flag) {
  ajax({
    url: "http://localhost:2333/getInfo?id=" + customId,
    success: function (jsonData) {
      if (jsonData && jsonData.code === 0) {
        var data = jsonData.data;
        userName.value = data.name;
        userAge.value = data.age;
        userPhone.value = data.phone;
        userAddress.value = data.address;
      }
    }
  });
}

// 点击提交按钮不一定是增加，还可能是修改
submit.onclick = function () {
  var obj = {
    name: userName.value,
    age: userAge.value,
    phone: userPhone.value,
    address: userAddress.value
  };

  // 修改操作
  if (flag) {
    obj.id = customId;
    ajax({
      url: "http://localhost:2333/updateInfo",
      type: "POST",
      data: JSON.stringify(obj),
      success: function (jsonData) {
        if (jsonData && jsonData.code === 0) {
          window.location.href = "index.html";
        } else {
          alert(jsonData.msg);
        }
      }
    });
    return;
  }

  // 增加操作
  ajax({
    url: "http://localhost:2333/addInfo",
    type: "POST",
    data: JSON.stringify(obj), //请求主体中的内容是JSON格式字符串
    success: function (jsonData) {
      if (jsonData && jsonData.code === 0) {
        // 成功后跳转回到首页
        window.location.href = "./index.html";
      } else {
        alert(jsonData.msg);
      }
    }
  });
};
