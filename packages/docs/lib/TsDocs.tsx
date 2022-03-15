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
    console.log(docs);
    return () => <section class="docs ts-docs">
      <h2 id={docs.name}>
        {docs.name}
        {docs.typeParameters ? getTypeParamString(docs.typeParameters) : ''}
      </h2>
      <p>{docs.kindString}</p>
      <p>{docs.comment}</p>
    </section>;
  },
});
