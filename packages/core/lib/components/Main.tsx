import {
  defineComponent,
  provide,
  shallowReactive,
  ref,
  PropType,
  Ref,
} from 'vue';
import {
  IBlockData,
  IBlockDefinition,
  IBlockLibrary,
  ITreeNode,
  OnUpdateBlockCb,
} from '../types';
import { model } from '../block-helpers';
import { SymMode, SbMode } from '../mode';
import { SymBlockLibrary} from '../use-dynamic-blocks';
import {
  SymBlockTree,
  SymBlockTreeRegister,
  SymBlockTreeUnregister,
} from '../use-block-tree';
import { SymEditorDimensions, useResizeObserver } from '../use-resize-observer';
import { SymActiveBlock } from '../use-activation';

import { SbMainMenu } from './MainMenu';
import { SbBlockToolbar } from './BlockToolbar';
import { SbBlock } from './Block';

import './Main.scss';

export const SbMain = defineComponent({
  name: 'sb-main',

  model,

  props: {
    availableBlocks: {
      type: Array as PropType<IBlockDefinition<any>[]>,
      default: () => [],
    },
    block: {
      type: Object as PropType<IBlockData<any>>,
      required: true,
    },
    /**
     * Called when the block should be updated.
     */
    onUpdate: {
      type: (null as unknown) as PropType<OnUpdateBlockCb>,
      default: () => {},
    },
    mode: {
      type: String as PropType<SbMode>,
      validator(value: any) {
        return Object.values(SbMode).includes(value);
      },
      default: SbMode.Edit,
    },
  },

  setup(props: any) { // TODO: why does the typing of props not work here?
    const el: Ref<null|HTMLElement> = ref(null);
    useResizeObserver(el, SymEditorDimensions);

    const mode = ref(props.mode);
    provide(SymMode, mode);

    const activeBlock = ref(null);
    provide(SymActiveBlock, activeBlock);

    const blockTree: Ref<ITreeNode|null> = ref(null);
    provide(SymBlockTree, blockTree);
    provide(SymBlockTreeRegister, (block: ITreeNode) => { blockTree.value = block; });
    provide(SymBlockTreeUnregister, () => { blockTree.value = null; });

    const blockLibrary: IBlockLibrary = shallowReactive({
      ...props.availableBlocks.reduce(
        (blocks: IBlockLibrary, block: IBlockDefinition<any>) => ({ ...blocks, [block.name]: block }),
        {},
      ),
    });

    provide(SymBlockLibrary, blockLibrary);

    return () => (
      <div
        class="sb-main"
        ref={el}
      >
        {
          mode.value === SbMode.Edit
          ? <>
            <SbMainMenu block={props.block} />
            <SbBlockToolbar />
          </>
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
