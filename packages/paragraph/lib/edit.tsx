import {
  defineComponent,
  reactive,
  computed,
  ref,
  Ref,
  onMounted,
  PropType,
} from 'vue';
import {
  getDefaultData,
  ParagraphData,
} from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-paragraph-edit',

  model: {
    prop: 'block',
    event: 'update',
  },

  props: {
    blockId: { type: String, required: true },
    data: {
      type: (null as unknown) as PropType<ParagraphData>,
      default: getDefaultData,
    },
  },

  setup(props) {
    const localData = (reactive({
      value: props.data.value,
      align: props.data.align,
      focused: false,
    }) as unknown) as {
      value: string;
      align: string;
      focused: boolean;
    };

    const inputEl: Ref<null|HTMLElement> = ref(null);
    onMounted(() => {
      if (inputEl.value) {
        inputEl.value.innerHTML = localData.value;
      }
    });

    const classes = computed(() => ({
      'sb-paragraph': true,
      'sb-paragraph_focused': localData.focused,
      [`sb-paragraph_align-${localData.align}`]: true,
    }));

    return () => (
      <div class={classes.value}>
        <p
          class="sb-paragraph__input"
          ref={inputEl}
          contenteditable
        ></p>
      </div>
    );
  },
});
