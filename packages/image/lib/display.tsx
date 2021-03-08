import { defineComponent, PropType } from 'vue';
import {
  model,
  SbBlock,
} from '@schlechtenburg/core';
import {
  getDefaultData,
  ImageData,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-image-display',

  model,

  props: {
    data: {
      type: (null as unknown) as PropType<ImageData>,
      default: getDefaultData,
    },
  },

  setup(props) {
    return () => <figure class="sb-image">
        <img
          class="sb-image__content"
          src={props.data.src}
          alt={props.data.alt}
        />
        <SbBlock block={props.data.description} />
      </figure>;
  },
});
