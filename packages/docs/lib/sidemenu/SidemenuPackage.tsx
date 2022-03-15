import {
  defineComponent,
  PropType,
} from 'vue';
import { RouterLink } from 'vue-router';
import { getShortPackageName } from '../package';
import { IDocs } from '../docs';

export default defineComponent({
  name: 'Sidemenu',

  props: {
    package: {
      type: (null as unknown) as PropType<IDocs>,
      required: true,
    },
  },

  setup(props) {
    const { lib, components } = props.package;
    const shortName = getShortPackageName(lib.name);
    return () => <div>
      <RouterLink
        class="sidemenu--link sidemenu--link_package"
        to={{
          name: 'package',
          params: { package: shortName },
        }}
      >{lib.name}</RouterLink>
      <ul class="sidemenu--package-children">
        {...(lib.children || []).map(child => <li class="sidemenu--package-child">
          <RouterLink
            class="sidemenu--link"
            to={{
              name: 'package',
              params: { package: shortName },
              hash: '#' + child.name,
            }}
          >{child.name}</RouterLink>
        </li>)}
      </ul>
    </div>;
  },
});
