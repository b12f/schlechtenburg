import { defineComponent, PropType } from 'vue';
import {
  model,
  blockProps,
  SbBlock,
} from '@schlechtenburg/core';

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
