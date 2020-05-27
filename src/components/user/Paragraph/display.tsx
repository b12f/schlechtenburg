import {
  defineComponent,
  reactive,
  computed,
  ref,
  Ref,
  onMounted,
  watch,
  PropType,
} from '@vue/composition-api';
import {
  model,
  blockProps,
  useActivation,
} from '@components/TreeElement';

import SbToolbar from '@internal/Toolbar';

import {
  getDefaultData,
  ParagraphData,
  ParagraphProps,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-paragraph-edit',

  model,

  props: {
    ...blockProps,
    data: {
      type: (null as unknown) as PropType<ParagraphData>,
      default: getDefaultData,
    },
    eventUpdate: {
      type: (Function as unknown) as (b?: ParagraphData) => void,
      default: () => () => undefined,
    },
    eventInsertBlock: {
      type: (Function as unknown) as (b?: ParagraphData) => void,
      default: () => () => undefined,
    },
  },

  setup(props: ParagraphProps, context) {
    const classes = computed(() => ({
      'sb-paragraph': true,
      [`sb-paragraph_align-${props.data.align}`]: true,
    }));

    return () => (
      <p class={classes}>{props.data.value}</p>
    );
  },
});
