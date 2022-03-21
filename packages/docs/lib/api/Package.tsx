import { defineComponent } from 'vue';

import { ComponentDoc } from 'vue-docgen-api';
import { DeclarationReflection } from 'typedoc';

import ComponentDocs from './ComponentDocs';
import TSDocs from './TSDocs';

import './Package.scss';

export default defineComponent({
  name: 'Package',

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const packageName = props.name;
    const docs = getByName(getShortPackageName(Array.isArray(packageName) ? packageName[0] : packageName));
    if (!docs) {
      return () => <div>Unknown package name {packageName}</div>;
    }

    const { lib, components } = docs;
    return () => <div class="package">
      <h1>{lib.name}</h1>
      <p>{lib.comment}</p>
      <p>{lib.flags}</p>
      {...(lib.children || []).map((child:DeclarationReflection) => {
        const componentDocs = components.find((c: ComponentDoc) => c.exportName === child.name);
        if (componentDocs) {
          return <ComponentDocs docs={componentDocs}></ComponentDocs>
        }

        return <TSDocs docs={child}></TSDocs>
      })}
    </div>;
  },
});
