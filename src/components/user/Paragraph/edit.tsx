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
  },

  setup(props: ParagraphProps, context) {
    const localData = (reactive({
      value: props.data.value,
      align: props.data.align,
      focused: false,
    }) as any) as {
      value: string;
      align: string;
      focused: boolean;
    };

    const inputEl: Ref<null|HTMLElement> = ref(null);

    const { isActive, activate } = useActivation(props.blockId);

    onMounted(() => {
      if (inputEl.value) {
        inputEl.value.innerHTML = localData.value;

        if (isActive.value) {
          inputEl.value.focus();
        }
      }
    });

    watch(() => props.data, () => {
      localData.value = props.data.value;
      localData.align = props.data.align;
      if (inputEl.value) {
        inputEl.value.innerHTML = localData.value;
      }
    });

    const onTextUpdate = ($event: InputEvent) => {
      localData.value = ($event.target as HTMLElement).innerHTML;
    };

    const classes = computed(() => ({
      'sb-paragraph': true,
      'sb-paragraph_focused': localData.focused,
      [`sb-paragraph_align-${localData.align}`]: true,
    }));

    const setAlignment = ($event: Event) => {
      context.emit('update', { align: ($event.target as HTMLSelectElement).value });
    };

    const onFocus = () => {
      localData.focused = true;
    };

    const onBlur = () => {
      localData.focused = false;
      context.emit('update', {
        value: localData.value,
      });
      activate(null);
    };

    const onKeypress = ($event: KeyboardEvent) => {
      if ($event.key === 'Enter') {
        const blockId = `${+(new Date())}`;
        context.emit('insert-block', {
          blockId,
          name: 'sb-paragraph',
          data: getDefaultData(),
        });

        activate(blockId);

        $event.preventDefault();
      }
    };

    return () => (
      <div class={classes.value}>
        <SbToolbar>
          <select
            value={localData.align}
            {...{
              on: {
                change: setAlignment,
              },
            }}
          >
            <option>left</option>
            <option>center</option>
            <option>right</option>
          </select>
        </SbToolbar>
        <p
          class="sb-paragraph__input"
          ref={inputEl}
          contenteditable
          {...{
            on: {
              input: onTextUpdate,
              focus: onFocus,
              blur: onBlur,
              keypress: onKeypress,
            },
          }}
        ></p>
      </div>
    );
  },
});
