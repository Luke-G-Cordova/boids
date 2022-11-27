const path = require('path');

module.exports = {
  entry: './build/test/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build', 'test'),
  },
  watch: true,
  watchOptions: {
    ignored: ['**/node_modules', '**/src', '**/deprecated'],
  },
};
