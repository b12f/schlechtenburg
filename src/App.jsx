import {
  defineComponent,
  reactive,
} from 'vue';

import { SbMain } from '../packages/core/lib';

import SbParagraph from '../packages/paragraph/lib';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    const block = reactive({
      "name": "sb-paragraph",
      "id": "1590592112200",
      "data": {
        "value": "This is the first paragraph<br>",
        "align": "left"
      },
    });

    return () => <SbMain
      block={block}
      customBlocks={[ SbParagraph ]}
      key="edit"
    />;
  },
});
