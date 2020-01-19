var http = require("http");
var url = require("url");
var fs = require("fs");

// 创建一个服务
var server = http.createServer(function (req, res) {
  // 解析客户端请求地址中的文件目录名称以及传递给当前服务器的数据内容
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;

  // 处理静态资源文件的请求 (HTML/CSS/JS)
  var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO)/i;

  if (reg.test(pathname)) {
    var suffix = reg.exec(pathname)[1].toUpperCase();
    // 根据请求文件的后缀名获取到当前文件的MIME类型
    var suffixMIME = "text/plain";

    switch (suffix) {
      case "HTML":
        suffixMIME = "text/html";
        break;
      case "CSS":
        suffixMIME = "text/css";
        break;
      case "JS":
        suffixMIME = "text/javascript";
        break;
      case "JSON":
        suffixMIME = "application/json";
        break;
      case "ICO":
        suffixMIME = "application/octet-stream";
        break;
    }

    try {
      // 按照指定的目录读取文件中的内容（读取出来的内容都是字符串格式的）
      var conFile = fs.readFileSync("." + pathname, "utf-8");

      // 重写响应头信息：告诉客户端的浏览器我返回的内容是是什么样的MIME类型 && 制定返回的内容格式是UTF-8编码的，这样返回的中文就不会出现乱码
      res.writeHead(200, {'content-type': suffixMIME + '; charset=utf-8;'});

      // 服务端向客户端返回的内容应该也是字符串
      res.end(conFile);
    } catch (e) {
      res.writeHead(404, {'content-type': 'text/plain; charset=utf-8;'});
      res.end("request file is not found");
    }
  }

  try {
    var con = fs.readFileSync("." + pathname, "utf-8");
    res.end(con);
  } catch (e) {
    res.end("request file is not found");
  }
});

// 为当前的这个服务配置端口
server.listen(2333, function () {
  console.log("server is success");
});
