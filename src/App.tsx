import {
  defineComponent,
  reactive,
  watchEffect,
} from '@vue/composition-api';
import Schlechtenburg from '@components/Schlechtenburg';
import { BlockData } from './components/TreeElement';

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
    }) as BlockData;

    return () => (
      <div id="app">
        <Schlechtenburg
          block={block}
          {...{
            on: {
              update: (newBlock: BlockData) => {
                block.name = newBlock.name;
                block.blockId = newBlock.blockId;
                block.data = newBlock.data;
              },
            },
          }}
        />

        <pre><code>{JSON.stringify(block, null, 2)}</code></pre>
      </div>
    );
  },
});
