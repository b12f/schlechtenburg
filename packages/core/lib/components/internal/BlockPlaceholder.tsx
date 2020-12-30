import { defineComponent } from 'vue';
import { BlockDefinition } from '/@/blocks';
import BlockPicker from '/@internal/BlockPicker';

import './BlockPlaceholder.scss';

export default defineComponent({
  name: 'sb-block-placeholder',

  setup(props, context) {
    return () => (
      <div class="sb-block-placeholder">
        <BlockPicker
          onPickedBlock={(block: BlockDefinition) => context.emit('insert-block', block)}
        />
      </div>
    );
  },
});
