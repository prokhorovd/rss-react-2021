module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  devServer: {
    hot: true,
    open: {
      app: {
        name: 'Google Chrome',
        arguments: ['--incognito'],
      }
    },
    historyApiFallback: true,
  }
}
