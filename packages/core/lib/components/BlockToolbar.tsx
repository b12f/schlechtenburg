import { defineComponent } from 'vue';

import './BlockToolbar.scss';

export const SbBlockToolbar = defineComponent({
  name: 'sb-block-toolbar',

  setup() {
    return () => (
      <div class="sb-block-toolbar"></div>
    );
  },
});
