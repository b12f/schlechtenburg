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
    block: { type: (null as unknown) as PropType<BlockData>, default: false },
  },

  setup(props, context) {
    const { isActive, activate } = useActivation(props.block.blockId);
    const { getBlock } = useDynamicBlocks();
    const classes = computed(() => ({
      'sb-block': true,
      'sb-block_active': isActive,
    }));

    const onChildUpdate = (updated: {[key: string]: any}) => {
      console.log('child update', updated);
      context.emit('update', {
        ...props.block,
        data: {
          ...props.block.data,
          ...updated,
        },
      });
    };

    return {
      getBlock,
      classes,
      activate,
      onChildUpdate,
    };
  },

  render() {
    console.log('render block', this.block);
    const Block = this.getBlock(this.block.name).edit;
    return <Block
      data={this.block.data}
      block-id={this.block.blockId}
      {...{
        attrs: this.$attrs,
        on: {
          ...this.$listeners,
          update: this.onChildUpdate,
          'insert-block': (block: BlockDefinition) => this.$emit('insert-block', block),
          'append-block': (block: BlockDefinition) => this.$emit('append-block', block),
        },
      }}
    />;
  },
});
