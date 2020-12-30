import { defineComponent } from 'vue';
import { BlockDefinition } from '../blocks';

import SbBlockPicker from './BlockPicker';

import './BlockPlaceholder.scss';

export const BlockPlaceholder = defineComponent({
  name: 'sb-block-placeholder',

  setup(props, context) {
    return () => (
      <div class="sb-block-placeholder">
        <SbBlockPicker
          onPickedBlock={(block: BlockDefinition) => context.emit('insert-block', block)}
        />
      </div>
    );
  },
});
