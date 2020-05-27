import {
  computed,
  defineComponent,
  PropType,
} from '@vue/composition-api';
import {
  Block,
  useDynamicBlocks,
  useActivation,
} from '@components/TreeElement';

import './Block.scss';

interface BlockProps {
  block: Block;
  eventUpdate: (b?: Block) => void;
  eventInsertBlock: (b?: Block) => void;
  eventAppendBlock: (b?: Block) => void;
}

export default defineComponent({
  name: 'sb-block',

  props: {
    block: {
      type: (null as unknown) as PropType<Block>,
      required: true,
    },
    eventUpdate: { type: Function, default: () => {} },
    eventInsertBlock: { type: Function, default: () => {} },
    eventAppendBlock: { type: Function, default: () => {} },
  },

  setup(props: BlockProps, context) {
    const { isActive, activate } = useActivation(props.block.blockId);
    const { getBlock } = useDynamicBlocks();
    const classes = computed(() => ({
      'sb-block': true,
      'sb-block_active': isActive.value,
    }));

    const onChildUpdate = (updated: {[key: string]: any}) => {
      props.eventUpdate({
        ...props.block,
        data: {
          ...props.block.data,
          ...updated,
        },
      });
    };

    const BlockComponent = getBlock(props.block.name) as any;

    return () => (<div class={classes.value}>
      <div class="sb-block__edit-cover"></div>
      <div class="sb-block__mover"></div>
      <BlockComponent
        data={props.block.data}
        block-id={props.block.blockId}
        eventUpdate={onChildUpdate}
        eventInsertBlock={props.eventInsertBlock}
        eventAppendBlock={props.eventAppendBlock}
        onClick={($event: MouseEvent) => {
          $event.stopPropagation();
          activate();
        }}
        {...{
          attrs: context.attrs,
          on: context.listeners,
        }}
      />
    </div>);
  },
});
