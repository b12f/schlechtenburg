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

import {
  getDefaultData,
  ImageData,
  ImageProps,
} from './util';

import SbToolbar from '@internal/Toolbar';

import './style.scss';

export default defineComponent({
  name: 'sb-image-edit',

  model,

  props: {
    ...blockProps,
    data: {
      type: (null as unknown) as PropType<ImageData>,
      default: getDefaultData,
    },
  },

  setup(props: ImageProps, context) {
    const localData = reactive({
      src: props.data.src,
      alt: props.data.alt,
    });

    console.log(localData);

    const fileInput: Ref<null|HTMLInputElement> = ref(null);

    const { isActive } = useActivation(props.blockId);

    watch(() => props.data, () => {
      console.log('props update image');
      localData.src = props.data.src;
      localData.alt = props.data.alt;
    });

    const selectImage = () => {
      console.log(fileInput);
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const onImageSelect = () => {
      console.log('select image');
      if (fileInput.value && fileInput.value.files && fileInput.value.files.length) {
        localData.src = window.URL.createObjectURL(fileInput.value.files[0]);
      }
    };

    return {
      localData,
      fileInput,
      selectImage,
      onImageSelect,
    };
  },

  render() {
    return (
      <div class="sb-image">
        <SbToolbar>
          Image Edit
          <input
            type="file"
            ref="fileInput"
            style="display: none;"
            {...{
              on: {
                input: this.onImageSelect,
              },
            }}
          />
        </SbToolbar>
        {this.localData.src ?
          <img src={this.localData.src} alt={this.localData.alt} /> :
          <button
            {...{
              on: {
                click: this.selectImage,
              },
            }}
          >Select Image</button>
        }
      </div>
    );
  },
});
