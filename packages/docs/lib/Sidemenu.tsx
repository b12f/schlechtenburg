import { defineComponent } from 'vue';

import './Sidemenu.scss';

export default defineComponent({
  name: 'Sidemenu',

  setup() {
    return () => <div class="sidemenu">
    </div>;
  },
});
