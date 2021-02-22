import {
  computed,
  ref,
  defineComponent,
} from 'vue';
import {
  useDynamicBlocks,
  BlockDefinition,
} from '../use-dynamic-blocks';

import { SbButton } from './Button';
import { SbModal } from './Modal';

import './BlockPicker.scss';

export const SbBlockPicker = defineComponent({
  name: 'sb-block-picker',

  props: {},

  setup(props, context) {
    const open = ref(false);
    const { customBlocks } = useDynamicBlocks();

    const blockList = computed(() => Object.keys(customBlocks).map((key) => customBlocks[key]));

    const selectBlock = (block: BlockDefinition) => () => {
      open.value = false;
      context.emit('picked-block', {
        name: block.name,
        blockId: `${+(new Date())}`,
        data: block.getDefaultData(),
      });
    };

    return () => (
      <div class="sb-block-picker">
        <SbButton
          class="sb-block-picker__add-button"
          type="button"
          onClick={($event: MouseEvent) => {
            open.value = true;
            $event.stopPropagation();
          }}
        >Add a block</SbButton>
        <SbModal
          open={open.value}
          onClick={($event: MouseEvent) => $event.stopPropagation()}
          onClose={() => {
            open.value = false;
          }}
        >
          {...blockList.value.map((block: BlockDefinition) => (
            <SbButton
              type="button"
              onClick={selectBlock(block)}
            >{block.name}</SbButton>
          ))}
        </SbModal>
      </div>
    );
  },
});
