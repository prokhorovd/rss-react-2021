const path = require('path');

const root = '../';
const buildFolder = 'build';
const buildPath = path.join(__dirname, root, buildFolder, 'client');

module.exports = {
  name: 'client',
  entry: path.resolve(__dirname, root, './src/client.tsx'),
  output: {
    path: path.resolve(buildPath),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}
