import {
  defineComponent,
  reactive,
  ref,
  Ref,
  watch,
  PropType,
} from '@vue/composition-api';
import {
  model,
  blockProps,
} from '@components/TreeElement';

import SbToolbar from '@internal/Toolbar';

import {
  getDefaultData,
  ImageData,
  ImageProps,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-image-edit',

  model,

  props: {
    ...blockProps,
    eventUpdate: { type: Function, default: () => {} },
    data: {
      type: (null as unknown) as PropType<ImageData>,
      default: getDefaultData,
    },
  },

  setup(props: ImageProps) {
    const localData = reactive({
      src: props.data.src,
      alt: props.data.alt,
    });

    console.log(props);

    const fileInput: Ref<null|HTMLInputElement> = ref(null);

    watch(() => props.data, () => {
      localData.src = props.data.src;
      localData.alt = props.data.alt;
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
          props.eventUpdate({
            src: reader.result,
            alt: props.data.alt,
          });
        });

        reader.readAsDataURL(fileInput.value.files[0]);
      }
    };

    return () => (
      <div class="sb-image">
        <SbToolbar>
          Image Edit
          <input
            type="file"
            ref="fileInput"
            style="display: none;"
            {...{
              on: {
                input: onImageSelect,
              },
            }}
          />
        </SbToolbar>
        {localData.src
          ? <img src={localData.src} alt={localData.alt} />
          : <button
            {...{
              on: {
                click: selectImage,
              },
            }}
          >Select Image</button>
        }
      </div>
    );
  },
});
