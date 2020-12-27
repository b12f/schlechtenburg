import {
  defineComponent,
  reactive,
  computed,
  watch,
  PropType,
} from 'vue';
import {
  model,
  useActivation,
  Block,
  blockProps,
} from '/@components/TreeElement';

import SbBlock from '/@internal/Block';
import SbButton from '/@internal/Button';
import SbToolbar from '/@internal/Toolbar';
import SbBlockPlaceholder from '/@internal/BlockPlaceholder';

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
      if (index === -1) {
        return;
      }
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
      localData.children = [
        ...localData.children,
        block,
      ];
      props.eventUpdate({ children: [...localData.children] });
      activate(block.blockId);
    };

    const insertBlock = (index: number, block: Block) => {
      localData.children = [
        ...localData.children.slice(0, index + 1),
        block,
        ...localData.children.slice(index + 1),
      ];
      props.eventUpdate({ children: [...localData.children] });
      activate(block.blockId);
    };

    const removeBlock = (index: number) => {
      localData.children = [
        ...localData.children.slice(0, index),
        ...localData.children.slice(index + 1),
      ];
      props.eventUpdate({ children: [...localData.children] });

      const newActiveIndex = Math.max(index - 1, 0);
      activate(localData.children[newActiveIndex].blockId);
    };

    const moveUp = (index: number) => {
      if (index === 0) {
        return;
      }

      const curr = localData.children[index];
      const prev = localData.children[index - 1];
      localData.children = [
        ...localData.children.slice(0, index - 1),
        curr,
        prev,
        ...localData.children.slice(index + 1),
      ];

      props.eventUpdate({ children: [...localData.children] });
    };

    const moveDown = (index: number) => {
      if (index === localData.children.length - 1) {
        return;
      }

      const curr = localData.children[index];
      const next = localData.children[index + 1];
      localData.children = [
        ...localData.children.slice(0, index),
        next,
        curr,
        ...localData.children.slice(index + 2),
      ];

      props.eventUpdate({ children: [...localData.children] });
    };

    console.log('Rendering edit');

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
            {...{ key: child.blockId }}
            data-order={index}
            block={child}
            eventUpdate={(updated: Block) => onChildUpdate(child, updated)}
            eventInsertBlock={(block: Block) => insertBlock(index, block)}
            eventAppendBlock={appendBlock}
            eventRemoveBlock={() => removeBlock(index)}
            eventMoveUp={() => moveUp(index)}
            eventMoveDown={() => moveDown(index)}
            sortable={localData.orientation}
            removable
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
