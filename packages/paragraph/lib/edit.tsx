import {
  defineComponent,
  reactive,
  computed,
  ref,
  onMounted,
} from 'vue';
import { getDefaultData } from './util';

import './style.scss';

export default defineComponent({
  name: 'sb-paragraph-edit',

  props: {
    blockId: { type: String, required: true },
    data: {
      type: null,
      default: getDefaultData,
    },
  },

  setup(props) {
    const localData = reactive({
      value: props.data.value,
      align: props.data.align,
    });

    const inputEl = ref(null);
    onMounted(() => {
      if (inputEl.value) {
        inputEl.value.innerHTML = localData.value;
      }
    });

    const classes = computed(() => ({
      'sb-paragraph': true,
      [`sb-paragraph_align-${localData.align}`]: true,
    }));

    return () => (
      <div class={classes.value}>
        <p
          class="sb-paragraph__input"
          ref={inputEl}
        ></p>
      </div>
    );
  },
});
