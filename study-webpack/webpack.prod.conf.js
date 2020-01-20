const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", // "production" | "development" | "none"

  entry: "./src/main.js", // 单入口文件起点
  // entry: { // 多入口文件起点
  //   pageOne: "./src/views/pageOne/index.js",
  //   pageTwo: "./src/views/pageTwo/index.js"
  // },

  // 输出结果的相关选项
  output: {
    path: path.resolve(__dirname, "dist"), // 所有输出文件的目标路径（必须是绝对路径）

    filename: "bundle.js" // 用于单入口起点
    // filename: "[name].js", // 用于多入口起点
    // filename: "[chunkhash].js", // 用于长效缓存
  },

  // 关于模块配置
  module: {
    // 模块规则（配置 loader、解析器等选项）
    rules: [
      // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
      // test 和 include 具有相同的作用，都是必须匹配选项
      // exclude 是必不匹配选项（优先于 test 和 include）
      // 最佳实践：
      // - 只在 test 和 文件名匹配 中使用正则表达式
      // - 在 include 和 exclude 中使用绝对路径数组
      // - 尽量避免 exclude，更倾向于使用 include
      {
        test: /\.(css|scss)$/,
        include: [path.resolve(__dirname, "src/assets/css")],
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  // 解析模块请求的选项（不适用于对 loader 解析）
  resolve: {
    // 解析模块时应该搜索的目录
    modules: ["node_modules", path.resolve(__dirname, "src")],

    // 使用的扩展名
    // extensions: [".js", ".json", ".css", ".scss"],

    // 模块别名列表
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  // 附加插件列表
  plugins: [
    new HtmlWebpackPlugin({
      title: "study-webpack",
      filename: "index.html",
      template: path.resolve(__dirname, "public/index.html"),
      // chunks: ["pageOne"], // 包含的块
      // excludeChunks: ["pageOne"] // 排除的块
    })
  ]
};
