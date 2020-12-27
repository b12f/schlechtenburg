import {
  defineComponent,
  provide,
  shallowReactive,
  ref,
  PropType,
  Ref,
} from 'vue';
import {
  model,
  ActiveBlock,
  Block,
  SbMode,
  Mode,
  EditorDimensions,
  BlockDefinition,
  BlockLibraryDefinition,
  BlockLibrary,
  useResizeObserver,
} from '/@components/TreeElement';

import SbBlock from '/@internal/Block';

import SbLayout from '/@user/Layout/index';
import SbParagraph from '/@user/Paragraph/index';
import SbImage from '/@user/Image/index';
import SbHeading from '/@user/Heading/index';

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
      type: String as SbMode,
      validator(value: string) {
        return Object.values(SbMode).includes(value);
      },
      default: SbMode.Edit,
    },
  },

  setup(props: SchlechtenburgProps) {
    const el: Ref<null|HTMLElement> = ref(null);
    useResizeObserver(el, EditorDimensions);

    const mode = ref(props.mode);
    provide(Mode, mode);

    const activeBlock = ref(null);
    provide(ActiveBlock, activeBlock);

    const blockLibrary: BlockLibraryDefinition = shallowReactive({
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
      <div
        class="sb-main"
        ref={el}
      >
        <SbBlock
          block={props.block}
          eventUpdate={props.eventUpdate}
        />
      </div>
    );
  },
});
