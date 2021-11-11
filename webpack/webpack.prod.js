const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new ESLintPlugin({ extensions: ['tsx', 'ts', 'js'] }),
  ]
}
