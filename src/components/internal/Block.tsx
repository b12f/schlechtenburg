import {
  computed,
  defineComponent,
  PropType,
} from '@vue/composition-api';
import {
  Block,
  useDynamicBlocks,
  useActivation,
  SbMode,
} from '@components/TreeElement';

import './Block.scss';

interface BlockProps {
  block: Block;
  eventUpdate: (b?: Block) => void;
  eventInsertBlock: (b?: Block) => void;
  eventAppendBlock: (b?: Block) => void;
  eventRemoveBlock: () => void;
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
    eventRemoveBlock: { type: Function, default: () => {} },
  },

  setup(props: BlockProps, context) {
    const { isActive, activate } = useActivation(props.block.blockId);
    const { mode, getBlock } = useDynamicBlocks();
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
    if (mode.value === SbMode.Display) {
      return () => (
        <BlockComponent
          data={props.block.data}
          block-id={props.block.blockId}
        />
      );
    }

    return () => (<div class={classes.value}>
      <div class="sb-block__edit-cover"></div>
      <div class="sb-block__mover"></div>
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
    </div>);
  },
});
