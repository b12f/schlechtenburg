const path = require('path');

const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set('@', SRC_DIR)
      .set('@components', path.join(SRC_DIR, 'components'))
      .set('@internal', path.join(SRC_DIR, 'components/internal'))
      .set('@user', path.join(SRC_DIR, 'components/user'));
  },
};
