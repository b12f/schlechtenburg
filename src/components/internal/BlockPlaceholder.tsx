import { defineComponent } from '@vue/composition-api';
import { BlockDefinition } from '../TreeElement';
import BlockPicker from './BlockPicker';

import './BlockPlaceholder.scss';

export default defineComponent({
  name: 'sb-block-placeholder',

  render() {
    return (
      <div class="sb-block-placeholder">
        <BlockPicker
          {...{
            on: {
              'picked-block': (block: BlockDefinition) => this.$emit('insert-block', block),
            },
          }}
        />
      </div>
    );
  },
});
