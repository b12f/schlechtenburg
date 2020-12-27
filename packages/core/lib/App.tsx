import { defineComponent, reactive, ref } from 'vue';
import Schlechtenburg from '/@components/Schlechtenburg';
import { Block, SbMode } from '/@components/TreeElement';

import initialData from './initial-data.json';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    const activeTab = ref('edit');
    const block = reactive(initialData) as Block;

    return () => (
      <div id="app">
        <select
          value={activeTab.value}
          onchange={($event: Event) => { activeTab.value = ($event.target as HTMLSelectElement).value; }}
        >
          <option>edit</option>
          <option>display</option>
          <option>json</option>
        </select>

        <Schlechtenburg
          v-show={activeTab.value === 'edit'}
          block={block}
          eventUpdate={(newBlock: Block) => {
            block.name = newBlock.name;
            block.blockId = newBlock.blockId;
            block.data = newBlock.data;
          }}
        />

        <Schlechtenburg
          v-show={activeTab.value === 'display'}
          block={block}
          mode={SbMode.Display}
        />

        <pre v-show={activeTab.value === 'json'}>
          <code>{JSON.stringify(block, null, 2)}</code>
        </pre>
      </div>
    );
  },
});
