import {
  defineComponent,
  provide,
  shallowReactive,
  ref,
  PropType,
  Ref,
} from 'vue';
import {
  BlockData,
  BlockDefinition,
  BlockLibrary,
  TreeNode,
} from '../types';
import { model } from '../block-helpers';
import { Mode, SbMode } from '../mode';
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

import './Schlechtenburg.scss';

export const SbMain = defineComponent({
  name: 'sb-main',

  model,

  props: {
    customBlocks: {
      type: Array as PropType<BlockDefinition<any>[]>,
      default: () => [],
    },
    block: {
      type: Object as PropType<BlockData<any>>,
      required: true,
    },
    onUpdate: { type: Function, default: () => {} },
    mode: {
      type: String as PropType<SbMode>,
      validator(value: any) {
        return Object.values(SbMode).includes(value);
      },
      default: SbMode.Edit,
    },
  },

  setup(props) { // TODO: why does the typing of props not work here?
    const el: Ref<null|HTMLElement> = ref(null);
    useResizeObserver(el, SymEditorDimensions);

    const mode = ref(props.mode);
    provide(Mode, mode);

    const activeBlock = ref(null);
    provide(SymActiveBlock, activeBlock);

    const blockTree: Ref<TreeNode|null> = ref(null);
    provide(SymBlockTree, blockTree);
    provide(SymBlockTreeRegister, (block: TreeNode) => { blockTree.value = block; });
    provide(SymBlockTreeUnregister, () => { blockTree.value = null; });

    const blockLibrary: BlockLibrary = shallowReactive({
      ...props.customBlocks.reduce(
        (blocks: BlockLibrary, block: BlockDefinition<any>) => ({ ...blocks, [block.name]: block }),
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
