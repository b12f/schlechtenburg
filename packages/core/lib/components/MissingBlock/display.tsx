import { defineComponent, PropType } from 'vue';
import {
  model,
  blockProps,
} from '../../block-helpers';

import './style.scss';

export default defineComponent({
  name: 'sb-missing-block',

  model,

  props: {
    ...blockProps,
    name: String,
    data: {
      type: (null as unknown) as PropType<any>,
      default: null,
    },
    eventUpdate: { type: Function, default: () => {} },
    eventAppendBlock: { type: Function, default: () => {} },
    eventRemoveBlock: { type: Function, default: () => {} },
  },

  setup(props) {
    return () => (
      <div class="sb-missing-block">Missing block: {props.name}</div>
    );
  },
});
