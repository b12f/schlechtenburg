import { defineComponent } from '@vue/composition-api';
import { useDynamicComponents } from './TreeElement';

export default defineComponent({
  props: {},

  setup(props) {
    const { customBlocks } = useDynamicComponents(props.components || {});

    return {
      customBlocks,
    };
  },

  render() {
    return (
      <div class="sb-block-picker">
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
