import {
  defineComponent,
  reactive,
  ref,
} from '@vue/composition-api';
import Schlechtenburg from '@components/Schlechtenburg';
import { Block } from './components/TreeElement';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    const activeTab = ref('edit');
    const block = reactive({
      name: 'sb-layout',
      blockId: `${+(new Date())}`,
      data: {
        orientation: 'vertical',
        children: [],
      },
    }) as Block;

    return () => (
      <div id="app">
        <select
          value={activeTab.value}
          {...{
            on: {
              change: ($event: Event) => {
                activeTab.value = ($event.target as HTMLSelectElement).value;
              },
            },
          }}
        >
          <option>edit</option>
          <option>display</option>
          <option>json</option>
        </select>
        <Schlechtenburg
          vShow={activeTab.value === 'edit'}
          block={block}
          eventUpdate={(newBlock: Block) => {
            block.name = newBlock.name;
            block.blockId = newBlock.blockId;
            block.data = newBlock.data;
          }}
        />

        <Schlechtenburg
          vShow={activeTab.value === 'display'}
          block={block}
          mode="display"
        />

        <pre vShow={activeTab.value === 'json'}>
          <code>{JSON.stringify(block, null, 2)}</code>
        </pre>
      </div>
    );
  },
});
