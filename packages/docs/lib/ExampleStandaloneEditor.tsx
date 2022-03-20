import {
  defineComponent,
  onMounted,
} from 'vue';

import { startSchlechtenburg } from '@schlechtenburg/standalone';
import { SbMode } from '@schlechtenburg/core';

import SbLayout from '@schlechtenburg/layout';
import SbHeading from '@schlechtenburg/heading';
import SbParagraph from '@schlechtenburg/paragraph';
import SbImage from '@schlechtenburg/image';

import exampleData from './example-data';

import './ExampleEditor.scss';

export default defineComponent({
  name: 'ExampleStandaloneEditor',

  setup() {
    const block = exampleData;

    onMounted(async () => {
      const { getBlock } = await startSchlechtenburg(
        '#example-editor',
        {
          // The input block data
          block,

          mode: SbMode.Edit,
          // The list of available blocks in this editor instance
          availableBlocks: [
            SbLayout,
            SbHeading,
            SbParagraph,
            SbImage,
          ],

          // This callback will be alled any time the block data gets updated
          onUpdate: (blockData) => {
            console.log('Got onUpdate', blockData);
            console.log('getBlock', getBlock());
          }
        },
      )
    });

    return () => <div id="example-editor"></div>;
  },
});
