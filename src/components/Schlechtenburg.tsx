import {
  defineComponent,
  computed,
  reactive,
} from '@vue/composition-api';
import { model, useDynamicComponents } from '@components/TreeElement';

export default defineComponent({
  name: 'schlechtenburg-main',

  model,

  props: {
    components: { type: Object, default: () => ({}) },
    tree: { type: Object, required: true },
  },

  setup(props) {
    const userComponents = computed(() => ({
      ...props.components,
    }));

    const { getComponent } = useDynamicComponents(userComponents);

    const state = reactive({
      activeBlockId: null,
    });
    const activate = (id) => {
      this.state.activeBlockId = id;
    };

    return {
      getComponent,
      userComponents,
      activate,
      state,
    };
  },

  render() {
    const Component = this.getComponent(this.tree.component);
    console.log(this.tree, Component);
    return (
      <Component
        class="sb-main"
        user-components={this.components}
        tree={this.tree}
        active-block-id={this.state.activeBlockId}
        {...{
          on: {
            tree: (tree) => this.$emit('tree', { ...tree }),
            activate: this.activate,
          },
        }}
      />
    );
  },
});
