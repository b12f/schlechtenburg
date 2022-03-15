import {
  defineComponent,
  PropType,
} from 'vue';
import {
  DeclarationReflection,
  TypeParameterReflection,
} from 'typedoc';

import './TsDocs.scss';

const getTypeParamString = (params: TypeParameterReflection[]) => `<${params.map(p => p.name).join(', ')}>`;

export default defineComponent({
  name: 'TsDocs',

  props: {
    docs: {
      type: (null as unknown) as PropType<DeclarationReflection>,
      required: true,
    },
  },

  setup(props) {
    const docs = props.docs;
    return () => <section class="docs ts-docs">
      <header class="docs--header">
        <h2
          class="docs--title"
          id={docs.name}
        >
          {docs.name}
          {docs.typeParameters ? getTypeParamString(docs.typeParameters) : ''}
        </h2>
        <p class="docs--type">{docs.kindString}</p>
      </header>

      <p class="docs--description">{docs.comment?.shortText || ''}</p>

      {...(docs.children || []).map(child => <pre><code>
        {child.name}: {child.type?.name}
      </code></pre>)}
    </section>;
  },
});
