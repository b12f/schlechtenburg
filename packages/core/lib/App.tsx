import { defineComponent, reactive, ref } from 'vue';
import Schlechtenburg from '/@components/Schlechtenburg';
import { Block } from '/@/blocks';
import { SbMode } from '/@/mode';

import initialData from './initial-data';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    const activeTab = ref('edit');
    const block: Block<any> = reactive(initialData);

    return () => (
      <div id="app">
        <select
          value={activeTab.value}
          onChange={($event: Event) => {
            activeTab.value = ($event.target as HTMLSelectElement).value;
          }}
        >
          <option>edit</option>
          <option>display</option>
          <option>data</option>
        </select>

        {(() => {
          switch (activeTab.value) {
            case SbMode.Edit:
              return <Schlechtenburg
                block={block}
                eventUpdate={(newBlock: Block<any>) => {
                  block.data = newBlock.data;
                }}
                key="edit"
                mode="edit"
              />;
            case SbMode.Edit:
              return <Schlechtenburg
                block={block}
                key="display"
                mode="display"
              />;
            case 'data':
              return <pre><code>{ JSON.stringify(block, null, 2) }</code></pre>;
          }
        })()}
      </div>
    );
  },
});
