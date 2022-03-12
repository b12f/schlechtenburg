import {
  onBeforeMount,
  computed,
  defineComponent,
  reactive,
  ref,
} from 'vue';

import { SbMain, IBlockData, SbMode } from '@schlechtenburg/core';

import SbLayout from '@schlechtenburg/layout';
import SbHeading from '@schlechtenburg/heading';
import SbParagraph from '@schlechtenburg/paragraph';
import SbImage from '@schlechtenburg/image';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    const activeTab = ref('edit');
    const block: IBlockData<any> = reactive({
      name: 'none',
      id: '0',
      data: null,
    });

    onBeforeMount(async () => {
      const res = await fetch('./initial-data.json');
      const data = await res.json();
      block.name = data.name;
      block.id = data.id;
      block.data = data.data;
    });

    const displayedElement = computed(() => {
      switch (activeTab.value) {
        case SbMode.Edit:
          return <SbMain
            block={block}
            onUpdate={(newBlock: IBlockData<any>) => {
              block.data = newBlock.data;
            }}
            availableBlocks={[
              SbLayout,
              SbHeading,
              SbImage,
              SbParagraph,
            ]}
            key="edit"
            mode={SbMode.Edit}
          />;
        case SbMode.Display:
          return <SbMain
            block={block}
            availableBlocks={[
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
      return <div class="app" id="app">
        <select
          class="app--mode"
          value={activeTab.value}
          onChange={($event: Event) => {
            activeTab.value = ($event.target as HTMLSelectElement).value;
          }}
        >
          <option>edit</option>
          <option>display</option>
          <option>data</option>
        </select>
        {displayedElement.value}
      </div>;
    };
  },
});
