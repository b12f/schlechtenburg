import {
  defineComponent,
  PropType,
} from 'vue';
import { Block } from '../blocks';

import { TreeBlockSelect } from './TreeBlockSelect';

import './MainMenu.scss';

interface MainMenuProps {
  block: Block;
}

export const SbMainMenu = defineComponent({
  name: 'sb-main-menu',

  props: {
    block: {
      type: (null as unknown) as PropType<Block>,
      required: true,
    },
  },

  setup(props: MainMenuProps, context) {
    return () => (
      <div class="sb-main-menu">
        <TreeBlockSelect
          block={block}
        />
      </div>
    );
  },
});
