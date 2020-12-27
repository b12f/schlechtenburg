import { defineComponent } from 'vue';
import { BlockDefinition } from '../TreeElement';
import BlockPicker from './BlockPicker';

import './BlockPlaceholder.scss';

export default defineComponent({
  name: 'sb-block-placeholder',

  setup(props, context) {
    return () => (
      <div class="sb-block-placeholder">
        <BlockPicker
          {...{
            on: {
              'picked-block': (block: BlockDefinition) => context.emit('insert-block', block),
            },
          }}
        />
      </div>
    );
  },
});
