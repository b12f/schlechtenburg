import {
  defineComponent,
  computed,
  reactive,
} from '@vue/composition-api';
import { model, useDynamicBlocks } from '@components/TreeElement';

export default defineComponent({
  name: 'schlechtenburg-main',

  model,

  props: {
    block: { type: Object, required: true },
  },

  setup(props, context) {
    const { getBlock } = useDynamicBlocks(context);

    return {
      getBlock,
    };
  },

  render() {
    const Block = this.getBlock(this.block.name);
    console.log(this.name, Block);
    return (
      <Component
        class="sb-main"
        user-components={this.components}
        data={this.block.data}
        id={this.block.id}
        {...{
          on: {
            blockUpdate: (block) => this.$emit('block-update', block),
          },
        }}
      />
    );
  },
});
