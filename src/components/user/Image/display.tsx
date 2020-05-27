import { defineComponent, PropType } from '@vue/composition-api';
import {
  model,
  blockProps,
} from '@components/TreeElement';

import {
  getDefaultData,
  ImageData,
  ImageProps,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-image-display',

  model,

  props: {
    ...blockProps,
    data: {
      type: (null as unknown) as PropType<ImageData>,
      default: getDefaultData,
    },
  },

  setup(props: ImageProps) {
    return () => <img
      class="sb-image"
      src={props.data.src}
      alt={props.data.alt}
    />;
  },
});
