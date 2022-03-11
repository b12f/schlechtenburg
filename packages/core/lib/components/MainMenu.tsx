import {
  defineComponent,
  PropType,
} from 'vue';
import { IBlockData } from '../types';
import { SbTreeBlockSelect } from './TreeBlockSelect';
import { SbGlobalInsert } from './GlobalInsert';

import './MainMenu.scss';

export const SbMainMenu = defineComponent({
  name: 'sb-main-menu',

  props: {
    block: {
      type: (null as unknown) as PropType<IBlockData<any>>,
      required: true,
    },
  },

  setup() {
    return () => (
      <div class="sb-main-menu">
        <SbTreeBlockSelect />
        <SbGlobalInsert />
      </div>
    );
  },
});
