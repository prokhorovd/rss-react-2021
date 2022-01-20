const path = require('path');

const root = '../';
const buildFolder = 'build'
const buildPath = path.join(__dirname, root, buildFolder, 'server');

module.exports = {
  name: 'server',
  target: 'node',
  entry: path.resolve(__dirname, root, './src/server.tsx'),
  output: {
    path: path.resolve(buildPath),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['null-loader'],
      },
    ]
  }
}
