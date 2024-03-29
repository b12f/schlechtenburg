import {
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

import exampleData from './example-data';

import './ExampleEditor.scss';

export default defineComponent({
  name: 'ExampleEditor',

  setup() {
    const activeTab = ref('edit');
    const block: IBlockData<any> = reactive({ ...exampleData });

    const displayedElement = computed(() => {
      switch (activeTab.value) {
        case 'data':
          return <pre><code>{ JSON.stringify(block, null, 2) }</code></pre>;
        default:
          return <SbMain
            class="example-editor--sb"
            block={block}
            availableBlocks={[
              SbLayout,
              SbHeading,
              SbImage,
              SbParagraph,
            ]}
            mode={activeTab.value as SbMode}
          />;
      }
    });

    return () => {
      return <div class="example-editor">
        <h2 class="example-editor--title">
          <span>Try it yourself</span>
          <select
            class="example-editor--mode"
            value={activeTab.value}
            onChange={($event: Event) => {
              activeTab.value = ($event.target as HTMLSelectElement).value;
            }}
          >
            <option value={SbMode.Edit}>Editor mode</option>
            <option value={SbMode.View}>Viewer mode</option>
            <option value="data">JSON Data structure</option>
          </select>
        </h2>
        {displayedElement.value}
      </div>;
    };
  },
});
