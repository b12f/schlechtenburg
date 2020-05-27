import {
  computed,
  defineComponent,
  PropType,
} from '@vue/composition-api';
import {
  BlockData,
  useDynamicBlocks,
  useActivation,
} from '@components/TreeElement';

import './Block.scss';

export default defineComponent({
  name: 'sb-block',

  props: {
    block: { type: (null as unknown) as PropType<BlockData>, required: true },
    eventUpdate: {
      type: (Function as unknown) as (b?: BlockData) => void,
      default: () => () => undefined,
    },
    eventInsertBlock: {
      type: (Function as unknown) as (b?: BlockData) => void,
      default: () => () => undefined,
    },
    eventAppendBlock: {
      type: (Function as unknown) as (b?: BlockData) => void,
      default: () => () => undefined,
    },
  },

  setup(props, context) {
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

    const Block = getBlock(props.block.name) as any;

    return () => <div class={classes.value}>
      <div class="sb-block__edit-cover"></div>
      <div class="sb-block__mover"></div>
      <Block
        data={props.block.data}
        block-id={props.block.blockId}
        eventUpdate={onChildUpdate}
        eventInsertBlock={props.eventInsertBlock}
        eventAppendBlock={props.eventAppendBlock}
        {...{
          attrs: context.attrs,
          on: {
            ...context.listeners,
            update: onChildUpdate,
          },
          nativeOn: {
            click: ($event: MouseEvent) => {
              $event.stopPropagation();
              activate();
            },
          },
        }}
      />
    </div>;
  },
});
