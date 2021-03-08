import {
  onBeforeMount,
  defineComponent,
  reactive,
} from 'vue';

import { SbMain, BlockData } from '../packages/core/lib';

import SbParagraph from '../packages/paragraph/lib';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    const block: BlockData<any> = reactive({
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

    return () => {
      return <div id="app">
          <SbMain
            block={block}
            onUpdate={(newBlock: BlockData<any>) => {
              block.data = newBlock.data;
            }}
            customBlocks={[ SbParagraph ]}
            key="edit"
          />
      </div>;
    };
  },
});
