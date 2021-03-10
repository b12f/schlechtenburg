import {
  defineComponent,
  provide,
} from 'vue';
import { ExampleSymbol } from '../use-dynamic-blocks';

import { SbBlock } from './Block';

import './Main.scss';

export const SbMain = defineComponent({
  name: 'sb-main',

  setup() {
    console.log('main setup');
    provide(ExampleSymbol , 0);

    return () => <div>
      Main
      <SbBlock />
    </div>;
  },
});
