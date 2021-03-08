import {
  defineComponent,
  reactive,
  ref,
  Ref,
  watch,
  PropType,
} from 'vue';
import {
  model,
  SbToolbar,
  SbButton,
  SbBlock,
  BlockData,
} from '@schlechtenburg/core';
import { ParagraphData } from '@schlechtenburg/paragraph';
import {
  getDefaultData,
  ImageData,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-image-edit',

  model,

  props: {
    onUpdate: { type: Function, default: () => {} },
    data: {
      type: (null as unknown) as PropType<ImageData>,
      default: getDefaultData,
    },
  },

  setup(props) {
    const localData = reactive({
      src: props.data.src,
      alt: props.data.alt,
      description: props.data.description,
    });

    const fileInput: Ref<null|HTMLInputElement> = ref(null);

    watch(() => props.data, () => {
      localData.src = props.data.src;
      localData.alt = props.data.alt;
      localData.description = props.data.description;
    });

    const selectImage = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const onImageSelect = () => {
      if (fileInput.value && fileInput.value.files && fileInput.value.files.length) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const src = reader?.result?.toString();
          if (!src) {
            throw new Error('Couldn\'t load image src');
          }

          props.onUpdate({
            src,
            alt: props.data.alt,
            description: props.data.description,
          });
        });

        reader.readAsDataURL(fileInput.value.files[0]);
      }
    };

    const onDescriptionUpdate = (description: BlockData<ParagraphData>) => {
      props.onUpdate({
        ...props.data,
        description,
      });
    };

    return () => (
      <figure class="sb-image">
        <SbToolbar>
          {localData.src
            ? <SbButton {...{ 'onClick:value': selectImage }}>Select Image</SbButton>
            : null}
          <input
            type="file"
            ref={fileInput}
            style="display: none;"
            onInput={onImageSelect}
          />
        </SbToolbar>
        {localData.src
          ? <>
              <img
                src={localData.src}
                alt={localData.alt}
                class="sb-image__content"
              />
              <SbBlock
                block={localData.description}
                onUpdate={(updated: BlockData<ParagraphData>) => onDescriptionUpdate(updated)}
              />
            </>
          : <SbButton {...{ 'onClick:value': selectImage }}>Select Image</SbButton>
        }
      </figure>
    );
  },
});
