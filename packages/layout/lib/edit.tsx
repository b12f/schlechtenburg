import {
  defineComponent,
  reactive,
  computed,
  watch,
  PropType,
} from 'vue';
import {
  model,
  Block,
  blockProps,
  useActivation,

  SbBlock,
  SbButton,
  SbToolbar,
  SbBlockPlaceholder,
  SbBlockOrdering,
} from '@schlechtenburg/core';

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
    onUpdate: { type: Function, default: () => {} },
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
      console.log('toggle');
      props.onUpdate({
        orientation: localData.orientation === 'vertical' ? 'horizontal' : 'vertical',
      });
    };

    const onChildUpdate = (child: Block, updated: Block) => {
      const index = localData.children.indexOf(child);
      if (index === -1) {
        return;
      }
      props.onUpdate({
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
      props.onUpdate({ children: [...localData.children] });
      activate(block.blockId);
    };

    const insertBlock = (index: number, block: Block) => {
      localData.children = [
        ...localData.children.slice(0, index + 1),
        block,
        ...localData.children.slice(index + 1),
      ];
      props.onUpdate({ children: [...localData.children] });
      activate(block.blockId);
    };

    const removeBlock = (index: number) => {
      localData.children = [
        ...localData.children.slice(0, index),
        ...localData.children.slice(index + 1),
      ];
      props.onUpdate({ children: [...localData.children] });

      const newActiveIndex = Math.max(index - 1, 0);
      activate(localData.children[newActiveIndex].blockId);
    };

    const activateBlock = (index: number) => {
      const safeIndex =
        Math.max(
           Math.min(
             localData.children.length - 1,
             index,
           ),
          0,
        );
      activate(localData.children[safeIndex].blockId);
    };

    const moveBackward = (index: number) => {
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

      props.onUpdate({ children: [...localData.children] });
    };

    const moveForward = (index: number) => {
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

      props.onUpdate({ children: [...localData.children] });
    };

    return () => (
      <div class={classes.value}>
        <SbToolbar>
          <SbButton
            type="button"
            onClick={toggleOrientation}
          >{localData.orientation}</SbButton>
        </SbToolbar>

        {...localData.children.map((child, index) => (
          <SbBlock
            {...{ key: child.blockId }}
            data-order={index}
            block={child}
            onUpdate={(updated: Block) => onChildUpdate(child, updated)}
            onRemoveSelf={() => removeBlock(index)}
            onPrependBlock={(block: Block) => insertBlock(index - 1, block)}
            onAppendBlock={(block: Block) => insertBlock(index, block)}
            onActivatePrevious={(block: Block) => activateBlock(index - 1,)}
            onActivateNext={(block: Block) => activateBlock(index + 1,)}
          >
            {{
              'context-toolbar': () =>
                <SbBlockOrdering
                  onMoveBackward={() => moveBackward(index)}
                  onMoveForward={() => moveForward(index)}
                  onRemove={() => removeBlock(index)}
                  sortable={props.sortable}
                />,
            }}
          </SbBlock>
        ))}

        <SbBlockPlaceholder onInsertBlock={appendBlock} />
      </div>
    );
  },
});
