import {
  computed,
  ref,
  defineComponent,
} from 'vue';
import { useDynamicBlocks } from '../use-dynamic-blocks';
import { BlockDefinition } from '../types';

import { SbButton } from './Button';
import { SbModal } from './Modal';

import './BlockPicker.scss';

export const SbBlockPicker = defineComponent({
  name: 'sb-block-picker',

  props: {
    onPickedBlock: { type: Function, default: () => {} },
  },

  setup(props) {
    const open = ref(false);
    const { customBlocks } = useDynamicBlocks();

    const blockList = computed(() => Object.keys(customBlocks).map((key) => customBlocks[key]));

    const selectBlock = (block: BlockDefinition<any>) => () => {
      open.value = false;
      props.onPickedBlock({
        name: block.name,
        id: `${+(new Date())}`,
        data: block.getDefaultData(),
      });
    };

    return () => (
      <div class="sb-block-picker">
        <SbButton
          class="sb-block-picker__add-button"
          {...{
            type: 'button',
            onClick: ($event: MouseEvent) => {
              open.value = true;
              $event.stopPropagation();
            },
          }}
        >+</SbButton>
        <SbModal
          open={open.value}
          onClose={() => {
            open.value = false;
          }}
          {...{ onClick: ($event: MouseEvent) => $event.stopPropagation() }}
        >
          {...blockList.value.map((block: BlockDefinition<any>) => (
            <SbButton
              {...{
                type: 'button',
                onClick: () => selectBlock(block),
              }}
            >{block.name}</SbButton>
          ))}
        </SbModal>
      </div>
    );
  },
});
