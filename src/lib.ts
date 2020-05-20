/* eslint no-param-reassign: 0 */

interface UserBlock {
  name: string;
  edit: () => Promise<any>;
  display: () => Promise<any>;
}

function addUserBlock(Vue, block) {
  if (Vue.prototype.$sb.blocks[block.name]) {
    console.warn(`Block ${block.name} is already registered`);
  }
  Vue.prototype.$sb.blocks[block.name] = block;
}

export default {
  install(Vue, { blocks }: { blocks: UserBlock[] } = { blocks: [] }) {
    Vue.prototype.$sb = {
      blocks: {},
      activeBlockId: null,
    };

    addUserBlock(Vue, {
      name: 'sb-layout',
      edit: () => import('@user/Layout'),
      display: () => import('@user/Layout'),
    });

    addUserBlock(Vue, {
      name: 'sb-image',
      edit: () => import('@user/Image'),
      display: () => import('@user/Image'),
    });

    addUserBlock(Vue, {
      name: 'sb-paragraph',
      edit: () => import('@user/Paragraph'),
      display: () => import('@user/Paragraph'),
    });

    addUserBlock(Vue, {
      name: 'sb-heading',
      edit: () => import('@user/Heading'),
      display: () => import('@user/Heading'),
    });

    blocks.forEach((block) => addUserBlock(Vue, block));
  },
};
