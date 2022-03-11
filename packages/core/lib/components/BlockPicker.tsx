import {
  computed,
  ref,
  defineComponent,
} from 'vue';
import { useDynamicBlocks } from '../use-dynamic-blocks';
import { IBlockDefinition } from '../types';

import { SbButton } from './Button';
import { SbContextMenu } from './ContextMenu';

import './BlockPicker.scss';

export const SbBlockPicker = defineComponent({
  name: 'sb-block-picker',

  props: {
    onPickedBlock: { type: Function, default: () => {} },
  },

  setup(props, context) {
    const open = ref(false);

    const { customBlocks } = useDynamicBlocks();

    const blockList = computed(() => Object.keys(customBlocks).map((key) => customBlocks[key]));

    const selectBlock = (block: IBlockDefinition<any>) => () => {
      open.value = false;
      props.onPickedBlock({
        name: block.name,
        id: `${+(new Date())}`,
        data: block.getDefaultData(),
      });
    };

    return () => (
      <div class="sb-block-picker">
        <SbContextMenu
          class="sb-tree-block-select"
          v-slots={{
            context: (slotContext) => context.slots.context
              ? context.slots.context(slotContext)
              : <SbButton {...{ onClick: slotContext.toggle }}>Insert a block</SbButton>,
            default: ({ close }: { close: Function }) => blockList.value.map((block: IBlockDefinition<any>) => (
            <SbButton
              {...{
                type: 'button',
                onClick: () => {
                  selectBlock(block);
                  close();
                },
              }}
            >{block.name}</SbButton>)),
          }}
        ></SbContextMenu>
      </div>
    );
  },
});
