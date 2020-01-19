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

  // 静态资源文件请求处理
  var reg = /\.(HTML|CSS|JS|ICO)/i;

  if (reg.test(pathname)) {
    var suffix = reg.exec(pathname)[1].toUpperCase();
    var suffixMIME = suffix === "HTML" ? "text/html" : (suffix === "CSS" ? "text/css" : (suffix === "JS" ? "text/javascript" : "application/octet-stream"));

    try {
      res.writeHead(200, {"content-type": suffixMIME + "; charset=utf-8"});
      res.end(fs.readFileSync("." + pathname, "utf-8"));
    } catch (e) {
      res.writeHead(404);
      res.end("file is not found");
    }

    return;
  }

  var con = fs.readFileSync("./json/students.json", "utf-8");
  con.length === 0 ? con = '[]' : null;
  con = JSON.parse(con);

  // API接口处理
  if (pathname === "/getList") {
    var n = query.n;
    var ary = [];
    var result = null;

    for (var i = (n - 1) * 10; i < n * 10; i++) {
      // 通过规律计算的索引比最大的索引都要大，直接跳出即可，不需要再存储（最后一页）
      if (i > con.length - 1) {
        break;
      }
      ary.push(con[i]);
    }

    if (0 < n && n <= Math.ceil(con.length / 10)) {
      result = {
        code: 0,
        msg: "获取成功",
        total: Math.ceil(con.length / 10),
        data: ary
      };
    } else {
      result = {
        code: 1,
        msg: "当前页不存在",
        total: Math.ceil(con.length / 10),
        data: null
      };
    }

    res.writeHead(200, {"content-type": "application/json; charset=utf-8"});
    res.end(JSON.stringify(result));

    return;
  }

  if (pathname === "/getInfo") {
    var studentId = query.id;
    var obj = null;
    var result = null;

    for (var i = 0; i < con.length; i++) {
      if (con[i].id == studentId) {
        obj = con[i];
        break;
      }
    }

    if (obj) {
      result = {
        code: 0,
        msg: "获取成功",
        data: obj
      }
    } else {
      result = {
        code: 1,
        msg: "当前ID不存在",
        data: null
      }
    }
    res.writeHead(200, {"content-type": "application/json; charset=utf-8"});
    res.end(JSON.stringify(result));

    return;
  }

  res.writeHead(404, {"content-type": "text/plain; charset=utf-8"});
  res.end("请求的接口地址不存在");
});

server.listen(2333, function () {
  console.log("server is successed");
});
