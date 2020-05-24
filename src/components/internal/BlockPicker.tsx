import { computed, defineComponent } from '@vue/composition-api';
import { useDynamicBlocks } from '../TreeElement';

import './BlockPicker.scss';

export default defineComponent({
  props: {},

  setup() {
    const { customBlocks } = useDynamicBlocks();

    const blockList = computed(() => Object.keys(customBlocks).map((key) => customBlocks[key]));
    console.log(customBlocks, blockList);

    return { blockList };
  },

  render() {
    return (
      <div class="sb-block-picker">
        {...this.blockList.map((block: BlockDefinition) => (
          <button
            type="button"
            {...{
              on: {
                click: ($event) => this.$emit('picked-block', {
                  name: block.name,
                  blockId: +(new Date()),
                  data: block.getDefaultData(),
                }),
              },
            }}
          >{block.name}</button>
        ))}
      </div>
    );
  },
});
