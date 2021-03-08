import { defineComponent } from 'vue';
import { BlockData } from '../types';

import { SbBlockPicker } from './BlockPicker';

import './BlockPlaceholder.scss';

export const SbBlockPlaceholder = defineComponent({
  name: 'sb-block-placeholder',

  props: {
    onInsertBlock: { type: Function, default: () => {} },
  },

  setup(props) {
    return () => (
      <div class="sb-block-placeholder">
        <SbBlockPicker
          onPickedBlock={(block: BlockData<any>) => props.onInsertBlock(block)}
        />
      </div>
    );
  },
});
