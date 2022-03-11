import { defineComponent } from 'vue';
import { IBlockData } from '../types';

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
          onPickedBlock={(block: IBlockData<any>) => props.onInsertBlock(block)}
        />
      </div>
    );
  },
});
