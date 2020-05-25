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
  BlockData,
  BlockDefinition,
  BlockLibraryDefinition,
  BlockLibrary,
} from '@components/TreeElement';

import SbBlock from '@internal/Block';

import SbLayout from '@user/Layout/index';
import SbParagraph from '@user/Paragraph/index';
import SbImage from '@user/Image/index';
import SbHeading from '@user/Heading/index';

export interface SchlechtenburgProps {
  customBlocks: BlockDefinition[];
  block: BlockData;
}

export default defineComponent({
  name: 'schlechtenburg-main',

  model,

  props: {
    customBlocks: { type: (null as unknown) as PropType<BlockDefinition[]>, default: () => [] },
    block: { type: (null as unknown) as PropType<BlockData>, required: true },
  },

  setup(props, context) {
    const activeBlock = ref(null);
    provide(ActiveBlock, activeBlock);

    const blockLibrary: BlockLibraryDefinition = reactive({
      'sb-layout': SbLayout,
      'sb-image': SbImage,
      'sb-paragraph': SbParagraph,
      'sb-heading': SbHeading,
      ...props.customBlocks.reduce(
        (
          blocks,
          block,
        ) => ({ ...blocks, [block.name]: block }),
        {},
      ),
    });
    provide(BlockLibrary, blockLibrary);

    return () => (
      <SbBlock
        class="sb-main"
        block={props.block}
        {...{
          on: {
            update: (block: BlockDefinition) => context.emit('update', block),
          },
        }}
      />
    );
  },
});
