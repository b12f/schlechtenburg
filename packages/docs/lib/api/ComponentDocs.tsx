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
      <header class="docs--header">
        <h2
          class="docs--title"
          id={docs.exportName}
        >{docs.exportName}</h2>
        <p class="docs--type">Component <code>&lt;{docs.displayName} /&gt;</code></p>
      </header>

      <p class="docs--description">{docs.description}</p>

      <h3>Props</h3>

      {...(docs.props || []).map(prop => <div class="component-docs--prop">
        <h4 class="component-docs--prop-name">{prop.name}</h4>
        <p class="component-docs--prop-description">{prop.description}</p>
        {prop.type ? <p>Type: <code>{prop.type.name}</code></p> : null}
        {prop.defaultValue ? <p>Default: <code>{prop.defaultValue.value}</code></p>: null}
      </div>)}
    </section>;
  },
});
