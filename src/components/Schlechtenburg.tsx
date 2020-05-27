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
  Block,
  SbMode,
  Mode,
  BlockDefinition,
  BlockLibraryDefinition,
  BlockLibrary,
} from '@components/TreeElement';

import SbBlock from '@internal/Block';

import SbLayout from '@user/Layout/index';
import SbParagraph from '@user/Paragraph/index';
import SbImage from '@user/Image/index';
import SbHeading from '@user/Heading/index';

import './Schlechtenburg.scss';

export interface SchlechtenburgProps {
  customBlocks: BlockDefinition[];
  eventUpdate: (b: Block) => void;
  block: Block;
  mode: SbMode;
}

export default defineComponent({
  name: 'schlechtenburg-main',

  model,

  props: {
    customBlocks: { type: Array as PropType<BlockDefinition[]>, default: () => [] },
    block: { type: Object as PropType<Block>, required: true },
    eventUpdate: { type: Function, default: () => {} },
    mode: {
      type: String,
      validator(value: string) {
        return ['edit', 'display'].includes(value);
      },
      default: 'edit',
    },
  },

  setup(props: SchlechtenburgProps) {
    const mode = ref(props.mode);
    provide(Mode, mode);

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
      <div class="sb-main">
        <SbBlock
          block={props.block}
          eventUpdate={props.eventUpdate}
        />
      </div>
    );
  },
});
