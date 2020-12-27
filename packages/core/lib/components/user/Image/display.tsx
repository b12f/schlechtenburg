import { defineAsyncComponent, PropType } from 'vue';
import {
  model,
  blockProps,
} from '/@components/TreeElement';

import {
  getDefaultData,
  ImageData,
  ImageProps,
} from './util';

import './style.scss';

export default defineAsyncComponent({
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
    console.log('img display', props.data);

    return () => <img
      class="sb-image"
      src={props.data.src}
      alt={props.data.alt}
    />;
  },
});
