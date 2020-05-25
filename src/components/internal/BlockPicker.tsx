import { computed, defineComponent } from '@vue/composition-api';
import {
  useDynamicBlocks,
  BlockDefinition,
} from '../TreeElement';

import './BlockPicker.scss';

export default defineComponent({
  name: 'sb-block-picker',

  props: {},

  setup(props, context) {
    const { customBlocks } = useDynamicBlocks();

    const blockList = computed(() => Object.keys(customBlocks).map((key) => customBlocks[key]));

    return () => (
      <div class="sb-block-picker">
        {...blockList.value.map((block: BlockDefinition) => (
          <button
            type="button"
            {...{
              on: {
                click: () => context.emit('picked-block', {
                  name: block.name,
                  blockId: `${+(new Date())}`,
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
