import {
  defineComponent,
  provide,
  shallowReactive,
  ref,
  watch,
  PropType,
  Ref,
} from 'vue';
import {
  model,
  Block,
  BlockDefinition,
  BlockLibraryDefinition,
} from '../blocks';
import { Mode, SbMode } from '../mode';
import { BlockLibrary } from '../use-dynamic-blocks';
import { EditorDimensions, useResizeObserver } from '../use-resize-observer';
import { ActiveBlock } from '../use-activation';

import { SbMainMenu } from './MainMenu';
import { SbBlock } from './Block';

import './Schlechtenburg.scss';

export interface SchlechtenburgProps {
  customBlocks: BlockDefinition[];
  onUpdate: (b: Block<any>) => void;
  block: Block<any>;
  mode: SbMode;
}

export const Schlechtenburg = defineComponent({
  name: 'schlechtenburg-main',

  model,

  props: {
    customBlocks: { type: Array as PropType<BlockDefinition[]>, default: () => [] },
    block: { type: Object as PropType<Block<any>>, required: true },
    onUpdate: { type: Function, default: () => {} },
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
        {
          mode.value === SbMode.Edit
          ? <SbMainMenu block={props.block} />
          : null
        }
        <SbBlock
          block={props.block}
          onUpdate={props.onUpdate}
        />
      </div>
    );
  },
});
