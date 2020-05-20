import { defineComponent } from '@vue/composition-api';
import { treeElementProps, useDynamicComponents } from './TreeElement';

export default defineComponent({
  props: {
    ...treeElementProps,
    orientation: String,
  },

  setup(props) {
    const getComponent = useDynamicComponents(props.components || {});

    return {
      getComponent,
    };
  },

  render() {
    return (
      <div class="sb-layout">
        {{ orientation }}

        <component
          class="sb-main"
          v-for="child in children"
          :key="child.id"
          :is="getComponent(child.name)"
          v-bind="child"
        />
      </div>
    );
  },
});
