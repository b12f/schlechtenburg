const path = require('path');

const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.resolve(ROOT_DIR, 'lib');

module.exports = {
  alias: {
    '/@/': SRC_DIR,
    '/@components/': path.join(SRC_DIR, 'components'),
    '/@internal/': path.join(SRC_DIR, 'components/internal'),
    '/@user/': path.join(SRC_DIR, 'components/user'),
  },
};
