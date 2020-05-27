import {
  computed,
  defineComponent,
  ref,
} from '@vue/composition-api';
import {
  useDynamicBlocks,
  BlockDefinition,
} from '../TreeElement';

import SbButton from './Button';
import SbModal from './Modal';

import './BlockPicker.scss';

export default defineComponent({
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
      <div
        class="sb-block-picker"
        onClick={($event: MouseEvent) => $event.stopPropagation()}
      >
        <SbButton
          type="button"
          onClick={() => {
            open.value = true;
            console.log(open);
          }}
        >Add a block</SbButton>
        <SbModal
          open={open.value}
          eventClose={() => {
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
