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
import { useDynamicBlocks } from '../use-dynamic-blocks';

import { SbBlockOrdering } from './BlockOrdering';

import './Block.scss';

interface BlockProps {
  block: Block;
  eventUpdate: (b?: Block) => void;
  eventPrependBlock: (b?: Block) => void;
  eventAppendBlock: (b?: Block) => void;
  eventRemoveBlock: () => void;
  eventMoveUp: () => void;
  eventMoveDown: () => void;
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
    eventUpdate: { type: Function, default: () => {} },
    eventPrependBlock: { type: Function, default: () => {} },
    eventAppendBlock: { type: Function, default: () => {} },
    eventRemoveBlock: { type: Function, default: () => {} },
    eventMoveUp: { type: Function, default: () => {} },
    eventMoveDown: { type: Function, default: () => {} },
  },

  setup(props: BlockProps, context) {
    const el: Ref<null|HTMLElement> = ref(null);
    const { mode, getBlock } = useDynamicBlocks();
    const { isActive, activate } = useActivation(props.block.blockId);
    const classes = computed(() => ({
      'sb-block': true,
      'sb-block_active': isActive.value,
    }));

    const BlockComponent = getBlock(props.block.name) as any;

    if (mode.value === SbMode.Display) {
      return () => (
        <BlockComponent
          data={props.block.data}
          block-id={props.block.blockId}
        />
      );
    }

    const { triggerSizeCalculation } = useResizeObserver(el, BlockDimensions);
    watch(() => props.block.data, triggerSizeCalculation);

    const onChildUpdate = (updated: {[key: string]: any}) => {
      props.eventUpdate({
        ...props.block,
        data: {
          ...props.block.data,
          ...updated,
        },
      });
    };

    return () => <div
      ref={el}
      class={classes.value}
    >
      <div class="sb-block__edit-cover"></div>
      {context.slots['context-toolbar'] ? context.slots['context-toolbar']() : null}
      <BlockComponent
        data={props.block.data}
        blockId={props.block.blockId}
        eventUpdate={onChildUpdate}
        eventPrependBlock={props.eventPrependBlock}
        eventAppendBlock={props.eventAppendBlock}
        eventRemoveBlock={props.eventRemoveBlock}
        onClick={($event: MouseEvent) => {
          $event.stopPropagation();
          activate();
        }}
        {...context.attrs}
      />
    </div>;
  },
});
