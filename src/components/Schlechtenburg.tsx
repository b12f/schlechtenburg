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
  eventUpdate: (b?: BlockData) => void;
  block: BlockData;
  mode: SbMode;
}

export default defineComponent({
  name: 'schlechtenburg-main',

  model,

  props: {
    customBlocks: { type: Array as PropType<BlockDefinition[]>, default: () => [] },
    block: { type: Object as PropType<BlockData>, required: true },
    eventUpdate: {
      type: (Function as unknown) as (b?: BlockData) => void,
      default: () => () => undefined,
    },
    mode: {
      type: String,
      validator(value: string) {
        return ['edit', 'display'].includes(value);
      },
      default: 'edit',
    },
  },

  setup(props: SchlechtenburgProps, context) {
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
