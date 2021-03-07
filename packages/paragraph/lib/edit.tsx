import {
  defineComponent,
  reactive,
  computed,
  ref,
  Ref,
  onMounted,
  watch,
  PropType,
} from 'vue';
import {
  model,
  blockProps,
  BlockProps,
  BlockData,
  useActivation,

  SbToolbar,
  SbSelect,
} from '@schlechtenburg/core';

import {
  getDefaultData,
  ParagraphData,
} from './util';

import './style.scss';

interface ParagraphProps extends BlockProps {
  data: ParagraphData;
  onUpdate: (b?: ParagraphData) => void;
  onAppendBlock: (b?: BlockData) => void;
  onRemoveSelf: () => void;
  onActivateNext: () => void;
  onActivatePrevious: () => void;
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
    onUpdate: { type: Function, default: () => {} },
    onAppendBlock: { type: Function, default: () => {} },
    onRemoveSelf: { type: Function, default: () => {} },
    onActivateNext: { type: Function, default: () => {} },
    onActivatePrevious: { type: Function, default: () => {} },
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
      props.onUpdate({
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
      props.onUpdate({
        value: localData.value,
        align: localData.align,
      });
    };

    const onKeydown = ($event: KeyboardEvent) => {
      if ($event.key === 'Enter' && !$event.shiftKey) {
        const id = `${+(new Date())}`;
        props.onAppendBlock({
          id,
          name: 'sb-paragraph',
          data: getDefaultData(),
        });

        activate(id);

        $event.preventDefault();
      }
    };

    const onKeyup = ($event: KeyboardEvent) => {
      if ($event.key === 'Backspace' && localData.value === '') {
        props.onRemoveSelf();
      }

      const selection = window.getSelection();
      const node = selection.focusNode;
      const childNodes = Array.from(inputEl.value.childNodes);
      const index = childNodes.indexOf(node);
      if (node === inputEl.value || index === 0 || index === childNodes.length -1) {
        switch ($event.key) {
          case 'ArrowDown':
            props.onActivateNext();
            break;
          case 'ArrowUp':
            props.onActivatePrevious();
            break;
        }
      }
    };

    return () => (
      <div class={classes.value}>
        <SbToolbar>
          <SbSelect
            value={localData.align}
            onChange={setAlignment}
          >
            <option>left</option>
            <option>center</option>
            <option>right</option>
          </SbSelect>
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
