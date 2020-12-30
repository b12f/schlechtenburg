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
  Block,
  BlockDefinition,
  BlockLibraryDefinition,
} from '/@/blocks';
import { Mode, SbMode } from '/@/mode';
import { BlockLibrary } from '/@/use-dynamic-blocks';
import { EditorDimensions, useResizeObserver } from '/@/use-resize-observer';
import { ActiveBlock } from '/@/use-activation';

import SbBlock from '/@internal/Block';

import SbLayout from '/@user/Layout/index';
import SbParagraph from '/@user/Paragraph/index';
import SbImage from '/@user/Image/index';
import SbHeading from '/@user/Heading/index';

import './Schlechtenburg.scss';

export interface SchlechtenburgProps {
  customBlocks: BlockDefinition[];
  eventUpdate: (b: Block<any>) => void;
  block: Block<any>;
  mode: SbMode;
}

export default defineComponent({
  name: 'schlechtenburg-main',

  model,

  props: {
    customBlocks: { type: Array as PropType<BlockDefinition[]>, default: () => [] },
    block: { type: Object as PropType<Block<any>>, required: true },
    eventUpdate: { type: Function, default: () => {} },
    mode: {
      type: String as PropType<SbMode>,
      validator(value: any) {
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
        (blocks: {[name: string]: Block<any>}, block: Block<any>) => ({ ...blocks, [block.name]: block }),
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
