var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function (req, res) {
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

  // JSONP的处理
  if (pathname === "/getAll") {
    // 接收客户端传递进来的函数名
    var callback = query.callback;

    // 准备数据
    var con = fs.readFileSync("./data.json", "utf-8");

    // 返回给客户端内容
    res.writeHead(200, {"content-type": "text/javascript; charset=utf-8"});
    res.end(callback + '(' + con + ')');
  }
});

server.listen(2333, function () {
  console.log("server is successed");
});
