import {
  defineComponent,
  reactive,
  watchEffect,
} from '@vue/composition-api';
import Schlechtenburg from '@components/Schlechtenburg';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    const block = reactive({
      name: 'sb-layout',
      blockId: `${+(new Date())}`,
      data: {
        orientation: 'vertical',
        children: [],
      },
    });

    watchEffect(() => {
      console.log('base block update', block);
    });

    return { block };
  },

  render() {
    return (
      <div id="app">
        <Schlechtenburg vModel={this.block} />

        <pre><code>{JSON.stringify(this.block, null, 2)}</code></pre>
      </div>
    );
  },
});
