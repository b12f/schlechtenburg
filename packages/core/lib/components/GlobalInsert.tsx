import { defineComponent } from 'vue';
import { ITreeNode } from '../types';
import { useBlockTree } from '../use-block-tree';
import { useActivation } from '../use-activation';

import { SbBlockPicker } from './BlockPicker';
import { SbButton } from './Button';

import './GlobalInsert.scss';

export const SbGlobalInsert = defineComponent({
  name: 'sb-global-insert',

  setup() {
    const { blockTree } = useBlockTree();
    const {
      activate,
      activeBlockId,
    } = useActivation();

    return () => (
      blockTree.value
        ?  <SbBlockPicker
          class="sb-global-insert"
          v-slots={{
            default: ({ toggle }: { toggle: Function }) => <SbButton {...{ onClick: toggle }}>+</SbButton>,
          }}
        />
        : ''
    );
  },
});
