import {
  defineComponent,
} from 'vue';

import { SbMain } from '../packages/core/lib';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    console.log('app setup');
    return () => <div>
      App
      <SbMain />
    </div>;
  },
});
