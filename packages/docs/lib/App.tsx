import {
  defineComponent,
} from 'vue';
import { RouterView } from 'vue-router';
import SideMenu from './sidemenu/Sidemenu';

import './App.scss';

export default defineComponent({
  name: 'App',

  setup() {
    return () => <div class="app">
      <SideMenu class="app--sidemenu"></SideMenu>
      <RouterView class="app--main"></RouterView>
    </div>;
  },
});
