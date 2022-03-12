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

export const SbBlock = defineComponent({
  name: 'sb-block',

  directives: {
    hoverCover,
  },

  props: {
    block: {
      type: (null as unknown) as PropType<IBlockData<any>>,
      required: true,
    },
    sortable: {
      type: String,
      default: null,
    },
    onUpdate: {
      type: (null as unknown) as PropType<OnUpdateBlockCb>,
      default: () => {},
    },
    onPrependBlock: {
      type: (null as unknown) as PropType<OnPrependBlockCb>,
      default: () => {},
    },
    onAppendBlock: {
      type: (null as unknown) as PropType<OnAppendBlockCb>,
      default: () => {},
    },
    onRemoveSelf: {
      type: (null as unknown) as PropType<OnRemoveSelfCb>,
      default: () => {},
    },
    onActivatePrevious: {
      type: (null as unknown) as PropType<OnActivatePreviousCb>,
      default: () => {},
    },
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

      if (mode.value === SbMode.Display) {
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
        {context.slots['context-toolbar'] ? context.slots['context-toolbar']() : null}
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
