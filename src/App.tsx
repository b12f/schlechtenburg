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
    const tree = reactive({
      component: 'sb-layout',
      orientation: 'vertical',
      children: [],
    });

    watchEffect(() => {
      console.log(tree);
    });

    return { tree };
  },

  render() {
    return (
      <div id="app">
        <Schlechtenburg vModel={this.tree} />

        <pre><code>{JSON.stringify(this.tree, null, 2)}</code></pre>
      </div>
    );
  },
});
