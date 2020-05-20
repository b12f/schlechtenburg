import { defineComponent } from '@vue/composition-api';

import './Toolbar.scss';

export default defineComponent({
  name: 'sb-toolbar',

  render() {
    return (
      <div class="sb-toolbar">
        {this.$slots.default}
      </div>
    );
  },
});
