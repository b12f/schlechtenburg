import {
  computed,
  defineComponent,
  PropType,
} from '@vue/composition-api';
import {
  BlockData,
  useDynamicBlocks,
  useActivation,
  BlockDefinition,
} from '@components/TreeElement';

import './Block.scss';

export default defineComponent({
  name: 'sb-block',

  props: {
    block: { type: (null as unknown) as PropType<BlockData>, required: true },
  },

  setup(props, context) {
    const { isActive, activate } = useActivation(props.block.blockId);
    const { getBlock } = useDynamicBlocks();
    const classes = computed(() => ({
      'sb-block': true,
      'sb-block_active': isActive.value,
    }));

    const onChildUpdate = (updated: {[key: string]: any}) => {
      context.emit('update', {
        ...props.block,
        data: {
          ...props.block.data,
          ...updated,
        },
      });
    };

    const Block = getBlock(props.block.name).edit as any;

    return () => <Block
      class={classes.value}
      data={props.block.data}
      block-id={props.block.blockId}
      {...{
        attrs: context.attrs,
        on: {
          ...context.listeners,
          update: onChildUpdate,
          'insert-block': (block: BlockDefinition) => context.emit('insert-block', block),
          'append-block': (block: BlockDefinition) => context.emit('append-block', block),
        },
        nativeOn: {
          click: ($event: MouseEvent) => {
            $event.stopPropagation();
            activate();
          },
        },
      }}
    />;
  },
});
