import {
  defineComponent,
  provide,
  computed,
  reactive,
  ref,
  PropType,
} from '@vue/composition-api';
import {
  model,
  ActiveBlock,
  BlockProps,
  BlockDefinition,
  BlockLibraryDefinition,
  BlockLibrary,
} from '@components/TreeElement';

import SbBlock from '@internal/Block';

export default defineComponent({
  name: 'schlechtenburg-main',

  model,

  props: {
    customBlocks: { type: (null as unknown) as PropType<BlockDefinition[]>, default: () => [] },
    block: { type: Object, required: true },
  },

  setup(props: BlockProps) {
    const activeBlock = ref(null);
    provide(ActiveBlock, activeBlock);

    const blockLibrary: BlockLibraryDefinition = reactive({
      'sb-layout': {
        name: 'sb-layout',
        edit: () => import('@user/Layout'),
        display: () => import('@user/Layout'),
      },
      'sb-image': {
        name: 'sb-image',
        edit: () => import('@user/Image'),
        display: () => import('@user/Image'),
      },
      'sb-paragraph': {
        name: 'sb-paragraph',
        edit: () => import('@user/Paragraph'),
        display: () => import('@user/Paragraph'),
      },
      'sb-heading': {
        name: 'sb-heading',
        edit: () => import('@user/Heading'),
        display: () => import('@user/Heading'),
      },
      ...props.customBlocks.reduce(
        (
          blocks: BlockLibraryDefinition,
          block: BlockLibraryDefinition,
        ) => ({ ...blocks, [block.name]: block }),
        {},
      ),
    });
    provide(BlockLibrary, blockLibrary);
  },

  render() {
    console.log('render base');
    return (
      <SbBlock
        class="sb-main"
        block={this.block}
        {...{
          on: {
            update: (block: BlockDefinition) => this.$emit('update', block),
          },
        }}
      />
    );
  },
});
