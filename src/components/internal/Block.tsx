import {
  computed,
  defineComponent,
  watch,
  PropType,
  ref,
  Ref,
} from '@vue/composition-api';
import {
  Block,
  useDynamicBlocks,
  useActivation,
  SbMode,
  BlockDimensions,
  useResizeObserver,
} from '@components/TreeElement';

import SbBlockOrdering from './BlockOrdering';

import './Block.scss';

interface BlockProps {
  block: Block;
  eventUpdate: (b?: Block) => void;
  eventInsertBlock: (b?: Block) => void;
  eventAppendBlock: (b?: Block) => void;
  eventRemoveBlock: () => void;
  eventMoveUp: () => void;
  eventMoveDown: () => void;
  sortable: string;
}

export default defineComponent({
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
    eventInsertBlock: { type: Function, default: () => {} },
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
      onClick={($event: MouseEvent) => $event.stopPropagation()}
    >
      <div class="sb-block__edit-cover"></div>
      {props.sortable
        ? <SbBlockOrdering
          eventMoveUp={props.eventMoveUp}
          eventMoveDown={props.eventMoveDown}
          eventRemoveBlock={props.eventRemoveBlock}
          sortable={props.sortable}
        />
        : null}
      <BlockComponent
        data={props.block.data}
        block-id={props.block.blockId}
        eventUpdate={onChildUpdate}
        eventInsertBlock={props.eventInsertBlock}
        eventAppendBlock={props.eventAppendBlock}
        eventRemoveBlock={props.eventRemoveBlock}
        {...{
          attrs: context.attrs,
          nativeOn: {
            click: ($event: MouseEvent) => {
              $event.stopPropagation();
              activate();
            },
            ...context.listeners,
          },
        }}
      />
    </div>;
  },
});
