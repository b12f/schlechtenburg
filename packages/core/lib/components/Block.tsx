import {
  defineComponent,
  computed,
  watch,
  PropType,
  ref,
  Ref,
} from 'vue';
import {
  IBlockData,
  OnUpdateBlockCb,
  OnActivateNextCb,
  OnRemoveSelfCb,
  OnAppendBlockCb,
  OnPrependBlockCb,
  OnActivatePreviousCb,
} from '../types';
import { SbMode } from '../mode';
import { useResizeObserver, SymBlockDimensions } from '../use-resize-observer';
import { useActivation } from '../use-activation';
import { useBlockTree } from '../use-block-tree';
import { useDynamicBlocks } from '../use-dynamic-blocks';
import hoverCover from '../directives/hover-cover';

import SbMissingBlock from './MissingBlock';

import './Block.scss';

/**
 * Displays a Schlechtenburg block either the mode of the schlechtenburg instance.
 * You can use this to display child blocks inside your own blocks.
 */
export const SbBlock = defineComponent({
  name: 'sb-block',

  directives: {
    hoverCover,
  },

  props: {
    /**
     * The state for the block.
     */
    block: {
      type: (null as unknown) as PropType<IBlockData<any>>,
      required: true,
    },
    /**
     * Called when the block should be updated.
     */
    onUpdate: {
      type: (null as unknown) as PropType<OnUpdateBlockCb>,
      default: () => {},
    },
    /**
     * Called when a sibling block should be inserted before the block
     */
    onPrependBlock: {
      type: (null as unknown) as PropType<OnPrependBlockCb>,
      default: () => {},
    },
    /**
     * Called when a sibling block should be inserted after the block
     */
    onAppendBlock: {
      type: (null as unknown) as PropType<OnAppendBlockCb>,
      default: () => {},
    },
    /**
     * Called when the block should be removed
     */
    onRemoveSelf: {
      type: (null as unknown) as PropType<OnRemoveSelfCb>,
      default: () => {},
    },
    /**
     * Called when the previous sibling block should be activated
     */
    onActivatePrevious: {
      type: (null as unknown) as PropType<OnActivatePreviousCb>,
      default: () => {},
    },
    /**
     * Called when the next sibling block should be activated
     */
    onActivateNext: {
      type: (null as unknown) as PropType<OnActivateNextCb>,
      default: () => {},
    },
  },

  setup(props, context) {
    const el: Ref<null|HTMLElement> = ref(null);
    const { mode, getBlock } = useDynamicBlocks();
    const {
      isActive,
      activate,
    } = useActivation(props.block.id);
    const classes = computed(() => ({
      'sb-block': true,
      'sb-block_active': isActive.value,
    }));

    const { triggerSizeCalculation } = useResizeObserver(el, SymBlockDimensions);
    watch(() => props.block.data, triggerSizeCalculation);

    const { register } = useBlockTree();
    register(props.block);
    watch(props.block, () => { register(props.block); });

    const onChildUpdate = (updated: {[key: string]: any}) => {
      props.onUpdate({
        ...props.block,
        data: {
          ...props.block.data,
          ...updated,
        },
      });
    };

    return () => {
      const BlockComponent = getBlock(props.block.name)?.[mode.value] as any;

      if (!BlockComponent) {
        const MissingBlock = SbMissingBlock[mode.value];
        return <MissingBlock
          name={props.block.name}
          blockId={props.block.id}
        />;
      }

      if (mode.value === SbMode.View) {
        return <BlockComponent
          data={props.block.data}
          blockId={props.block.id}
        />;
      }

      return <div
        ref={el}
        class={classes.value}
        v-hover-cover
      >
        {
          /**
           * This is an alternative toolbar location that parent blocks can use to offer UI elements specific to child blocks.
           * @slot context-toolbar
           */
          context.slots['context-toolbar'] ? context.slots['context-toolbar']() : null
        }
        <BlockComponent
          data={props.block.data}
          blockId={props.block.id}
          onUpdate={onChildUpdate}
          onPrependBlock={props.onPrependBlock}
          onAppendBlock={props.onAppendBlock}
          onRemoveSelf={props.onRemoveSelf}
          onActivatePrevious={props.onActivatePrevious}
          onActivateNext={props.onActivateNext}

          {...{
            onClick: ($event: MouseEvent) => {
              $event.stopPropagation();
              activate();
            },
            ...context.attrs,
          }}
        />
      </div>;
    };
  },
});
