import { defineComponent } from 'vue';

import './Introduction.scss';

export default defineComponent({
  name: 'Introduction',

  setup() {
    return () => <div class="introduction">Introduction</div>;
  },
});
