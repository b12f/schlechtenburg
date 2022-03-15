import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ComponentDoc } from 'vue-docgen-api';
import { DeclarationReflection } from 'typedoc';

import { getByName } from '../docs';
import ComponentDocs from '../ComponentDocs';
import TsDocs from '../TsDocs';

import './Package.scss';

export default defineComponent({
  name: 'Package',

  setup() {
    const route = useRoute();
    const packageName = route.params.package;
    const docs = getByName(Array.isArray(packageName) ? packageName[0] : packageName);
    if (!docs) {
      return () => <div>Unknown package name {packageName}</div>
    }

    const { lib, components } = docs;
    return () => <main class="package">
      <h1>{lib.name}</h1>
      <p>{lib.comment}</p>
      <p>{lib.flags}</p>
      {...(lib.children || []).map((child:DeclarationReflection) => {
        const componentDocs = components.find((c: ComponentDoc) => c.exportName === child.name);
        if (componentDocs) {
          return <ComponentDocs docs={componentDocs}></ComponentDocs>
        }

        return <TsDocs docs={child}></TsDocs>
      })}
    </main>;
  },
});
