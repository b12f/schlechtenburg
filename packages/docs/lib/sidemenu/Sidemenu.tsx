import { defineComponent } from 'vue';
import {
  core,
  layout,
  heading,
  paragraph,
  image,
} from '../docs';
import SidemenuPackage from './SidemenuPackage';

import './Sidemenu.scss';

export default defineComponent({
  name: 'Sidemenu',

  setup() {
    return () => <div class="sidemenu">
      <SidemenuPackage package={core}></SidemenuPackage>
      <SidemenuPackage package={layout}></SidemenuPackage>
      <SidemenuPackage package={heading}></SidemenuPackage>
      <SidemenuPackage package={paragraph}></SidemenuPackage>
      <SidemenuPackage package={image}></SidemenuPackage>
    </div>;
  },
});
