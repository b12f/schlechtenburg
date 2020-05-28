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
  BlockProps,
  BlockData,
  useActivation,
} from '@components/TreeElement';

import SbToolbar from '@internal/Toolbar';

import {
  getDefaultData,
  ParagraphData,
} from './util';

import './style.scss';

interface ParagraphProps extends BlockProps {
  data: ParagraphData;
  eventUpdate: (b?: ParagraphData) => void;
  eventInsertBlock: (b?: BlockData) => void;
  eventRemoveBlock: () => void;
}

export default defineComponent({
  name: 'sb-paragraph-edit',

  model,

  props: {
    ...blockProps,
    data: {
      type: (null as unknown) as PropType<ParagraphData>,
      default: getDefaultData,
    },
    eventUpdate: { type: Function, default: () => {} },
    eventInsertBlock: { type: Function, default: () => {} },
    eventRemoveBlock: { type: Function, default: () => {} },
  },

  setup(props: ParagraphProps) {
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

    const { isActive, activate } = useActivation(props.blockId);

    const focusInput = () => {
      if (inputEl.value && isActive.value) {
        inputEl.value.focus();
      }
    };

    onMounted(() => {
      focusInput();
      if (inputEl.value) {
        inputEl.value.innerHTML = localData.value;
      }
    });

    watch(isActive, focusInput);

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
      props.eventUpdate({
        value: localData.value,
        align: ($event.target as HTMLSelectElement).value,
      });
    };

    const onFocus = () => {
      localData.focused = true;
      activate();
    };

    const onBlur = () => {
      localData.focused = false;
      props.eventUpdate({
        value: localData.value,
        align: localData.align,
      });
      activate(null);
    };

    const onKeydown = ($event: KeyboardEvent) => {
      if ($event.key === 'Enter' && !$event.shiftKey) {
        const blockId = `${+(new Date())}`;
        props.eventInsertBlock({
          blockId,
          name: 'sb-paragraph',
          data: getDefaultData(),
        });

        activate(blockId);

        $event.preventDefault();
      }
    };

    const onKeyup = ($event: KeyboardEvent) => {
      if ($event.key === 'Backspace' && localData.value === '') {
        props.eventRemoveBlock();
      }
    };

    return () => (
      <div class={classes.value}>
        <SbToolbar>
          <select
            value={localData.align}
            onChange={setAlignment}
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
          onInput={onTextUpdate}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeydown={onKeydown}
          onKeyup={onKeyup}
        ></p>
      </div>
    );
  },
});
