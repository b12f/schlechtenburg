import {
  defineComponent,
  computed,
  watch,
  PropType,
  ref,
  Ref,
} from 'vue';
import { Block } from '../blocks';
import { SbMode } from '../mode';
import { useResizeObserver, BlockDimensions } from '../use-resize-observer';
import { useActivation } from '../use-activation';
import { useBlockTree } from '../use-block-tree';
import { useDynamicBlocks } from '../use-dynamic-blocks';

import { SbBlockOrdering } from './BlockOrdering';
import SbMissingBlock from './BlockMissing/index';

import './Block.scss';

interface BlockProps {
  block: Block;
  onUpdate: (b?: Block) => void;
  onPrependBlock: (b?: Block) => void;
  onAppendBlock: (b?: Block) => void;
  onRemoveSelf: () => void;
  onMoveBackward: () => void;
  onMoveForward: () => void;
  onActivateNext: () => void;
  onActivatePrevious: () => void;
  sortable: string;
}

export const SbBlock = defineComponent({
  name: 'sb-block',

  props: {
    block: {
      type: (null as unknown) as PropType<Block>,
      required: true,
    },
    sortable: {
      type: String,
      default: null,
    },
    onUpdate: { type: Function, default: () => {} },
    onPrependBlock: { type: Function, default: () => {} },
    onAppendBlock: { type: Function, default: () => {} },
    onRemoveSelf: { type: Function, default: () => {} },
    onMoveBackward: { type: Function, default: () => {} },
    onMoveForward: { type: Function, default: () => {} },
  },

  setup(props: BlockProps, context) {
    const el: Ref<null|HTMLElement> = ref(null);
    const { mode, getBlock } = useDynamicBlocks();
    const {
      isActive,
      activate,
      isHighlighted,
    } = useActivation(props.block.id);
    const classes = computed(() => ({
      'sb-block': true,
      'sb-block_active': isActive.value,
    }));

    const { triggerSizeCalculation } = useResizeObserver(el, BlockDimensions);
    watch(() => props.block.data, triggerSizeCalculation);

    const { register } = useBlockTree();
    register(props.block);
    watch(props.block, () => { register(props.block); });

    const onChildUpdate = (updated: {[key: string]: any}) => {
      props.onUpdate({
        ...props.block,
        data: {
          ...props.block.data,
          ...updated,
        },
      });
    };

    return () => {
      const BlockComponent = getBlock(props.block.name)?.[mode.value] as any;

      if (!BlockComponent) {
        const MissingBlock = SbMissingBlock[mode.value];
        return <MissingBlock
          name={props.block.name}
          blockId={props.block.id}
        />;
      }

      if (mode.value === SbMode.Display) {
        return <BlockComponent
          data={props.block.data}
          blockId={props.block.id}
        />;
      }

      return <div
        ref={el}
        class={classes.value}
      >
        <div class="sb-block__edit-cover"></div>
        {context.slots['context-toolbar'] ? context.slots['context-toolbar']() : null}
        <BlockComponent
          data={props.block.data}
          blockId={props.block.id}
          onUpdate={onChildUpdate}
          onPrependBlock={props.onPrependBlock}
          onAppendBlock={props.onAppendBlock}
          onRemoveSelf={props.onRemoveSelf}
          onActivatePrevious={props.onActivatePrevious}
          onActivateNext={props.onActivateNext}
          onClick={($event: MouseEvent) => {
            $event.stopPropagation();
            activate();
          }}
          {...context.attrs}
        />
      </div>;
    };
  },
});
