import {
  onBeforeMount,
  computed,
  defineComponent,
  reactive,
  ref,
} from 'vue';

import { Schlechtenburg, Block, SbMode } from '../packages/core/lib';

import SbLayout from '../packages/layout/lib';
import SbHeading from '../packages/heading/lib';
import SbParagraph from '../packages/paragraph/lib';
import SbImage from '../packages/image/lib';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    const activeTab = ref('edit');
    const block: Block<any> = reactive({
      name: 'none',
      id: '0',
      data: null,
    });

    onBeforeMount(async () => {
      const res = await fetch('/initial-data.json');
      const data = await res.json();
      block.name = data.name;
      block.id = data.id;
      block.data = data.data;
    });

    const Example = computed(() => {
      switch (activeTab.value) {
        case SbMode.Edit:
          return <Schlechtenburg
            block={block}
            onUpdate={(newBlock: Block<any>) => {
              block.data = newBlock.data;
            }}
            customBlocks={[
              SbLayout,
              SbHeading,
              SbImage,
              SbParagraph,
            ]}
            key="edit"
            mode={SbMode.Edit}
          />;
        case SbMode.Display:
          return <Schlechtenburg
            block={block}
            customBlocks={[
              SbLayout,
              SbHeading,
              SbImage,
              SbParagraph,
            ]}
            key="display"
            mode={SbMode.Display}
          />;
        case 'data':
          return <pre><code>{ JSON.stringify(block, null, 2) }</code></pre>;
      }
    });

    return () => {
      return <div id="app">
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
        <Example.value />
      </div>;
    };
  },
});
