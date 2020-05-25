import { defineComponent } from '@vue/composition-api';

import './Toolbar.scss';

export default defineComponent({
  name: 'sb-toolbar',

  setup(props, context) {
    return () => (
      <div class="sb-toolbar">
        {context.slots.default()}
      </div>
    );
  },
});
