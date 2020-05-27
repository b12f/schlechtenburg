import {
  reactive,
  computed,
  defineComponent,
  watch,
  PropType,
} from '@vue/composition-api';
import {
  model,
  useActivation,
  Block,
  blockProps,
} from '@components/TreeElement';

import SbBlock from '@internal/Block';
import SbButton from '@internal/Button';
import SbToolbar from '@internal/Toolbar';
import SbBlockPlaceholder from '@internal/BlockPlaceholder';

import {
  LayoutData,
  LayoutProps,
  getDefaultData,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-layout-edit',

  model,

  props: {
    ...blockProps,
    eventUpdate: { type: Function, default: () => {} },
    data: {
      type: (null as unknown) as PropType<LayoutData>,
      default: getDefaultData,
    },
  },

  setup(props: LayoutProps) {
    const { activate } = useActivation(props.blockId);

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
      props.eventUpdate({
        orientation: localData.orientation === 'vertical' ? 'horizontal' : 'vertical',
      });
    };

    const onChildUpdate = (child: Block, updated: Block) => {
      const index = localData.children.indexOf(child);
      props.eventUpdate({
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

    const appendBlock = (block: Block) => {
      props.eventUpdate({
        children: [
          ...localData.children,
          block,
        ],
      });
      activate(block.blockId);
    };

    const insertBlock = (index: number, block: Block) => {
      props.eventUpdate({
        children: [
          ...localData.children.slice(0, index + 1),
          block,
          ...localData.children.slice(index + 1),
        ],
      });
      activate(block.blockId);
    };

    return () => (
      <div class={classes.value}>
        <SbToolbar slot="toolbar">
          <SbButton
            type="button"
            {...{
              nativeOn: {
                click: toggleOrientation,
              },
            }}
          >{localData.orientation}</SbButton>
        </SbToolbar>

        {...localData.children.map((child, index) => (
          <SbBlock
            key={child.blockId}
            block={child}
            eventUpdate={(updated: Block) => onChildUpdate(child, updated)}
            eventInsertBlock={(block: Block) => insertBlock(index, block)}
            eventAppendBlock={appendBlock}
          />
        ))}

        <SbBlockPlaceholder
          {...{
            on: {
              'insert-block': appendBlock,
            },
          }}
        />
      </div>
    );
  },
});
