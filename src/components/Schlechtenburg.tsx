import {
  defineComponent,
  provide,
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

import SbLayout from '@user/Layout/index';
import SbParagraph from '@user/Paragraph/index';
import SbImage from '@user/Image/index';
import SbHeading from '@user/Heading/index';

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
      'sb-layout': SbLayout,
      'sb-image': SbImage,
      'sb-paragraph': SbParagraph,
      'sb-heading': SbHeading,
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
