import {
  reactive,
  defineComponent,
  watchEffect,
} from '@vue/composition-api';
import {
  model,
  treeElementProps,
  useDynamicComponents,
} from '@components/TreeElement';

import SbBlock from '@internal/Block';
import SbToolbar from '@internal/Toolbar';
import SbBlockPlaceholder from '@internal/BlockPlaceholder';

import './Layout.scss';

export default defineComponent({
  name: 'sb-layout',

  model,

  props: {
    ...treeElementProps,
  },

  setup(props, context) {
    const { getComponent } = useDynamicComponents(props.userComponents);

    const localData = reactive({
      orientation: props.tree.data.orientation,
      children: [...props.tree.data.children],
    });

    watchEffect(() => {
      localData.orientation = props.tree.data.orientation;
      localData.children = [...props.tree.data.children];
    });

    const classes = {
      'sb-layout': true,
      [`sb-layout_${localData.orientation}`]: true,
    };

    const toggleOrientation = () => {
      context.emit('data', {
        id: props.blockId,

        ...localData,
        orientation: localData.orientation === 'vertical' ? 'horizontal' : 'vertical',
      });
    };

    const onChildUpdate = (child, updated) => {
      const index = localData.children.indexOf(child);
      context.emit('data', {
        ...localData,
        children: [
          ...localData.children.slice(0, index),
          updated,
          ...localData.children.slice(index + 1),
        ],
      });
    };

    const addBlock = (block) => {
      context.emit('tree', {
        ...localData,
        children: [
          ...localData.children,
          block,
        ],
      });
    };

    return {
      classes,
      onChildUpdate,
      toggleOrientation,
      localData,
      getComponent,
      addBlock,
    };
  },

  render() {
    return (
      <SbBlock class={this.classes}>
        <SbToolbar slot="toolbar">
          <button
            type="button"
            {...{
              on: {
                click: this.toggleOrientation,
              },
            }}
          >{this.localTree.orientation}</button>
        </SbToolbar>

        {...this.localTree.children.map((child) => {
          const Component = this.getComponent(child.component);
          return <Component
            class="sb-main"
            key={child.id}
            components={this.components}
            tree={child}
            {...{
              on: {
                tree: (updated) => this.onChildUpdate(child, updated),
              },
            }}
          />;
        })}
        <SbBlockPlaceholder
          {...{
            on: {
              'add-block': this.addBlock,
            },
          }}
        />
      </SbBlock>
    );
  },
});
