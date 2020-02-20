const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/main.js", // 单入口文件起点
  // entry: { // 多入口文件起点
  //   sectionOne: "./src/views/sectionOne/index.js",
  //   sectionTwo: "./src/views/sectionTwo/index.js"
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
        // 解析样式
        test: /\.(css|scss)$/,
        include: [path.resolve(__dirname, "src/assets/css")],
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        // 解析图片
        test: /\.(jpg|png|gif)$/,
        include: [path.resolve(__dirname, "src/assets/images")],
        use: [
          {
            loader: "url-loader",
            options: {
              // 将小于 8KB 的图片转换成 base64
              // 如果图片大于 8KB，则默认使用 file-loader 进行解析
              limit: 1024 * 8
            }
          }
        ]
      },
      {
        // 解析字体
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },

  // 解析模块请求的选项（不适用于对 loader 解析）
  resolve: {
    // 解析模块时应该搜索的目录
    modules: [path.resolve(__dirname, "src"), "node_modules"],

    // 使用的扩展名
    // extensions: [".js", ".json", ".css", ".scss"],

    // 模块别名列表
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  // 附加插件列表
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "study-webpack",
      filename: "index.html",
      template: path.resolve(__dirname, "public/index.html")
      // chunks: ["sectionOne"], // 包含的块
      // excludeChunks: ["sectionOne"] // 排除的块
    })
  ]
};
