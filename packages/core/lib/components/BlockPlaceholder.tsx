import { defineComponent } from 'vue';
import { IBlockData } from '../types';

import { SbBlockPicker } from './BlockPicker';

import './BlockPlaceholder.scss';

/**
 * A placeholder for a block.
 * Displays a placeholder for a block, allowing the user to select a block to insert.
 * @sbui
 */
export const SbBlockPlaceholder = defineComponent({
  name: 'sb-block-placeholder',

  props: {
    /**
     * Called when the user picked a block that should be inserted here.
     */
    onInsertBlock: { type: Function, default: () => {} },
  },

  setup(props) {
    return () => (
      <div class="sb-block-placeholder">
        <SbBlockPicker
          onPickedBlock={(block: IBlockData<any>) => props.onInsertBlock(block)}
        />
      </div>
    );
  },
});
