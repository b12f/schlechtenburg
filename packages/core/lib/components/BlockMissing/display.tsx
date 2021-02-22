import { defineComponent, PropType } from 'vue';
import {
  model,
  blockProps,
  BlockProps,
} from '../../blocks';

import './style.scss';

interface MissingBlockProps extends BlockProps<any> {
  eventUpdate: (b?: any) => void;
  eventAppendBlock: (b?: any) => void;
  eventRemoveBlock: () => void;
}

export default defineComponent({
  name: 'sb-missing-block',

  model,

  props: {
    name: String,
    ...blockProps,
    data: {
      type: (null as unknown) as PropType<any>,
      default: null,
    },
    eventUpdate: { type: Function, default: () => {} },
    eventAppendBlock: { type: Function, default: () => {} },
    eventRemoveBlock: { type: Function, default: () => {} },
  },

  setup(props: MissingBlockProps) {
    return () => (
      <div class="sb-missing-block">
        Missing block: {props.name}
      </div>
    );
  },
});
