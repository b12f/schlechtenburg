import { defineComponent } from '@vue/composition-api';

import './BlockPlaceholder.scss';

export default defineComponent({
  name: 'sb-block-placeholder',

  render() {
    return (
      <div class="sb-block-placeholder">
        <button
          class="sb-block-placeholder__add"
          type="button"
          {...{
            on: {
              click: () => this.$emit('insert-block', {
                name: 'sb-paragraph',
                blockId: +(new Date()),
                data: {
                  value: '',
                },
              }),
            },
          }}
        >
          {this.$slots.default ? this.$slots.default : 'Add a block'}
        </button>
      </div>
    );
  },
});
