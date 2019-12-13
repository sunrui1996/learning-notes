var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE, PUT");

  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;

  // 处理静态资源文件
  var reg = /\.(HTML|CSS|JS|ICO)/i;

  if (reg.test(pathname)) {
    var suffix = reg.exec(pathname)[1].toUpperCase();
    var suffixMIME = "text/html";

    switch (suffix) {
      case "CSS":
        suffixMIME = "text/css";
        break;
      case "JS":
        suffixMIME = "text/javascript";
        break;
    }

    try {
      var conFile = fs.readFileSync("." + pathname, "utf-8");
      res.writeHead(200, {'content-type': suffixMIME + '; charset=utf-8'});
      res.end(conFile);
    } catch (e) {
      res.writeHead(404, {'content-type': 'text/plain' + '; charset=utf-8'});
      res.end("file is not found");
    }

    return;
  }

  // 处理API数据接口
  var con = null;
  var result = null;
  var customId = null;
  var str = "";
  var data = null;
  var customPath = "json/data.json";

  // 获取custom.json中的内容
  con = fs.readFileSync(customPath, "utf-8");
  // 为了防止custom.json中什么都没有，con是一个空字符串，当使用JSON.parse转换的时候会报错，我们让其等于'[]'
  con.length === 0 ? con = '[]' : null;
  con = JSON.parse(con);

  // 1）获取所有客户信息
  if (pathname === "/getList") {
    // 开始按照API文档中的规范准备给客户端返回的数据
    result = {
      code: 1,
      msg: "没有任何客户信息",
      data: null
    };

    if (con.length > 0) {
      result = {
        code: 0,
        msg: "获取成功",
        data: con
      }
    }

    res.writeHead(200, {"content-type": "application/json; charset=utf-8;"});
    res.end(JSON.stringify(result));

    return;
  }

  // 2）根据传递进来的客户ID获取某一个具体的客户信息
  if (pathname === "/getInfo") {
    // 把客户端传递进来的ID获取到
    customId = query.id;
    result = {
      code: 1,
      msg: "客户不存在",
      data: null
    };

    for (var i = 0; i < con.length; i++) {
      // customId是字符串格式的，所以不能使用全等
      if (con[i].id == customId) {
        result = {
          code: 0,
          msg: "获取成功",
          data: con[i]
        };
        break;
      }
    }
    res.writeHead(200, {"content-type": "application/json; charset=utf-8;"});
    res.end(JSON.stringify(result));
    return;
  }

  // 3）根据传递进来的客户ID删除对应客户
  if (pathname === "/removeInfo") {
    customId = query.id;
    // flag用来判断是否已经删除了客户
    var flag = false;
    for (var i = 0; i < con.length; i++) {
      if (con[i].id == customId) {
        con.splice(i, 1);
        flag = true;
        break;
      }
    }
    result = {code: 1, msg: "删除失败"};
    if (flag) {
      fs.writeFileSync(customPath, JSON.stringify(con), "utf-8");
      result = {code: 0, msg: "删除成功"};
    }

    res.writeHead(200, {"content-type": "application/json; charset=utf-8;"});
    res.end(JSON.stringify(result));

    return;
  }

  // 4）增加客户信息
  if (pathname === "/addInfo") {
    // 获取客户端通过请求主体传递进来的内容
    str = "";

    req.on("data", function (chunk) {
      str += chunk;
    });
    req.on("end", function () {
      // 如果没有传递内容进来则返回信息并结束操作
      if (str.length === 0) {
        res.writeHead(200, {"content-type": "application/json; charset=utf-8;"});
        res.end(JSON.stringify({code: 1, msg: "增加失败，没有传递需要增加的信息"}));
        return;
      }

      data = JSON.parse(str);
      // 在现有的data中追加一个id：获取con中最后一项的id，新的id在原有基础上+1即可。如果之前一项都没有，即追加的id就是1
      data.id = con.length === 0 ? 1 : parseFloat(con[con.length - 1].id) + 1;
      con.push(data);

      fs.writeFileSync(customPath, JSON.stringify(con), "utf-8");
      res.writeHead(200, {"content-type": "application/json; charset=utf-8;"});
      res.end(JSON.stringify({code: 0, msg: "增加成功"}));
    });

    return;
  }

  // 5）修改客户信息
  if (pathname === "/updateInfo") {
    str = "";

    req.on("data", function (chunk) {
      str += chunk;
    });
    req.on("end", function () {
      if (str.length === 0) {
        res.writeHead(200, {"content-type": "application/json; charset=utf-8"});
        res.end(JSON.stringify({code: 1, msg: "修改失败，没有传递需要修改的信息"}));
        return;
      }

      // flag用来判断是否已经进行了修改
      var flag = false;
      data = JSON.parse(str);

      for (var i = 0; i < con.length; i++) {
        if (con[i].id == data.id) {
          con[i] = data;
          flag = true;
          break;
        }
      }

      result = {code: 1, msg: "修改失败，没有匹配的id"};

      if (flag) {
        fs.writeFileSync(customPath, JSON.stringify(con), "utf-8");
        result = {code: 0, msg: "修改成功"};
      }

      res.writeHead(200, {"content-type": "application/json; charset=utf-8;"});
      res.end(JSON.stringify(result));
    });

    return;
  }

  // 如果请求的地址不是上述任何一个，则提示不存在
  res.writeHead(404, {"content-type": "text/plain; charset=utf-8;"});
  res.end("请求的数据接口不存在");
});

server.listen(2333, function () {
  console.log("server is successed");
});
