import {
  defineComponent,
  PropType,
} from 'vue';
import { BlockData } from '../types';
import { SbTreeBlockSelect } from './TreeBlockSelect';

import './MainMenu.scss';

export const SbMainMenu = defineComponent({
  name: 'sb-main-menu',

  props: {
    block: {
      type: (null as unknown) as PropType<BlockData<any>>,
      required: true,
    },
  },

  setup() {
    return () => (
      <div class="sb-main-menu">
        <SbTreeBlockSelect />
      </div>
    );
  },
});
