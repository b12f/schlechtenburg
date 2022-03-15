import {
  defineComponent,
  PropType,
} from 'vue';
import { ComponentDoc } from 'vue-docgen-api';

import './ComponentDocs.scss';

export default defineComponent({
  name: 'ComponentDocs',

  props: {
    docs: {
      type: (null as unknown) as PropType<ComponentDoc>,
      required: true,
    },
  },

  setup(props) {
    const docs = props.docs;
    return () => <section class="docs component-docs">
      <h2 id={docs.exportName}>{docs.exportName}</h2>
    </section>;
  },
});
