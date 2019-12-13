function getRandom(n, m) {
  return Math.round(Math.random() * (m - n) + n);
}

var str1 = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐"; //0-149
var str2 = "贡韵蛇牺兽拿鸟夏桐进试念篇涨善勒卷慨茎捆旁蛾径害田葵丑区午囊庭繁轧郊吊难勇载敌投爸衣婆甲拣铅务团谁肃崇党垮胆泛富净乳带哭点暮挪型泼卧陡暴浇计耻渔肯明好脸建炕手哨内统革眠足主歼副榨猾像垃理窑粉来加钻该立"; //0-99

var ary = [];

for (var i = 1; i <= 100; i++) {
  var obj = {};
  obj.id = i;
  obj.name = str1[getRandom(0, 149)] + str2[getRandom(0, 99)] + str2[getRandom(0, 99)];
  obj.sex = getRandom(0, 1);
  obj.score = getRandom(50, 99);
  ary.push(obj);
}

var fs = require("fs");
fs.writeFileSync("students.json", JSON.stringify(ary), "utf-8");
