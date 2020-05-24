import {
  inject,
  reactive,
  computed,
  defineComponent,
  watch,
  PropType,
} from '@vue/composition-api';
import {
  model,
  blockProps,
  useDynamicBlocks,
  useActivation,
  BlockData,
  BlockDefinition,
} from '@components/TreeElement';
import {
  LayoutData,
  LayoutProps,
  getDefaultData,
} from './util';

import SbBlock from '@internal/Block';
import SbToolbar from '@internal/Toolbar';
import SbBlockPlaceholder from '@internal/BlockPlaceholder';

import './style.scss';

export default defineComponent({
  name: 'sb-layout-edit',

  model,

  props: {
    ...blockProps,
    data: {
      type: (null as unknown) as PropType<LayoutData>,
      default: getDefaultData,
    },
  },

  setup(props: LayoutProps, context) {
    const { getBlock } = useDynamicBlocks();
    const { isActive, activate } = useActivation(props.blockId);

    const localData: LayoutData = reactive({
      orientation: props.data.orientation,
      children: [...props.data.children],
    });

    watch(() => props.data, () => {
      localData.orientation = props.data.orientation;
      localData.children = [...props.data.children];
    });

    const classes = computed(() => ({
      'sb-layout': true,
      [`sb-layout_${localData.orientation}`]: true,
    }));

    const toggleOrientation = () => {
      context.emit('update', {
        orientation: localData.orientation === 'vertical' ? 'horizontal' : 'vertical',
      });
    };

    const onChildUpdate = (child, updated) => {
      const index = localData.children.indexOf(child);
      context.emit('update', {
        children: [
          ...localData.children.slice(0, index),
          {
            ...child,
            ...updated,
          },
          ...localData.children.slice(index + 1),
        ],
      });
    };

    const appendBlock = (block: BlockData) => {
      context.emit('update', {
        children: [
          ...localData.children,
          block,
        ],
      });
      activate(block.blockId);
    };

    const insertBlock = (index: number, block: BlockData) => {
      context.emit('update', {
        children: [
          ...localData.children.slice(0, index + 1),
          block,
          ...localData.children.slice(index + 1),
        ],
      });
      activate(block.blockId);
    };

    return {
      isActive,
      activate,

      classes,
      onChildUpdate,
      toggleOrientation,
      localData,
      getBlock,
      appendBlock,
      insertBlock,
    };
  },

  render() {
    console.log('render layout');
    return (
      <div class={this.classes}>
        <SbToolbar slot="toolbar">
          <button
            type="button"
            {...{
              on: {
                click: this.toggleOrientation,
              },
            }}
          >{this.localData.orientation}</button>
        </SbToolbar>

        {...this.localData.children.map((child, index) => (
          <SbBlock
            key={child.id}
            block={child}
            {...{
              on: {
                update: (updated) => this.onChildUpdate(child, updated),
                'insert-block': (block: BlockDefinition) => this.insertBlock(index, block),
                'append-block': this.appendBlock,
              },
            }}
          />
        ))}

        <SbBlockPlaceholder
          {...{
            on: {
              'insert-block': this.appendBlock,
            },
          }}
        />
      </div>
    );
  },
});
