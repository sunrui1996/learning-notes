const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    sectionOne: "./src/views/sectionOne/index.js",
    sectionTwo: "./src/views/sectionTwo/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include: [path.resolve(__dirname, "src/assets/css")],
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        include: [path.resolve(__dirname, "src/assets/images")],
        use: {
          loader: "url-loader",
          options: {
            limit: 1024 * 8
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "study-webpack",
      filename: "index.html",
      template: path.resolve(__dirname, "public/index.html")
    })
  ]
};
