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
  useActivation,
  SbToolbar,
  SbSelect,
  OnUpdateSelfCb,
  OnAppendBlockCb,
  OnRemoveSelfCb,
  OnActivateNextCb,
  OnActivatePreviousCb,
  generateBlockId,
} from '@schlechtenburg/core';
import {
  getDefaultData,
  IHeadingData
} from './util';
import { getDefaultData as getDefaultParagraphData } from '@schlechtenburg/paragraph';

import './style.scss';

export default defineComponent({
  name: 'sb-heading-edit',

  model,

  props: {
    blockId: { type: String, required: true },
    data: {
      type: (null as unknown) as PropType<IHeadingData>,
      default: getDefaultData,
    },
    onUpdate: {
      type: (null as unknown) as PropType<OnUpdateSelfCb<IHeadingData>>,
      default: () => {},
    },
    onAppendBlock: {
      type: (null as unknown) as PropType<OnAppendBlockCb>,
      default: () => {},
    },
    onRemoveSelf: {
      type: (null as unknown) as PropType<OnRemoveSelfCb>,
      default: () => {},
    },
    onActivateNext: {
      type: (null as unknown) as PropType<OnActivateNextCb>,
      default: () => {},
    },
    onActivatePrevious: {
      type: (null as unknown) as PropType<OnActivatePreviousCb>,
      default: () => {},
    },
  },

  setup(props) {
    const localData = (reactive({
      value: props.data.value,
      align: props.data.align,
      level: props.data.level,
      focused: false,
    }) as unknown) as {
      value: string;
      align: string;
      level: number;
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
      localData.level = props.data.level;
      if (inputEl.value) {
        inputEl.value.innerHTML = localData.value;
      }
    });

    const onTextUpdate = ($event: Event) => {
      localData.value = ($event.target as HTMLElement).innerHTML;
    };

    const classes = computed(() => ({
      'sb-heading': true,
      'sb-heading_focused': localData.focused,
      [`sb-heading_align-${localData.align}`]: true,
      [`sb-heading_${localData.level}`]: true,
    }));

    const setLevel = ($event: Event) => {
      props.onUpdate({
        ...localData,
        level: parseInt(($event.target as HTMLSelectElement).value, 10),
      });
    };

    const setAlignment = ($event: Event) => {
      props.onUpdate({
        ...localData,
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
        level: localData.level,
      });
    };

    const onKeydown = ($event: KeyboardEvent) => {
      if ($event.key === 'Enter' && !$event.shiftKey) {
        const id = generateBlockId();
        props.onAppendBlock({
          id,
          name: 'sb-paragraph',
          data: getDefaultParagraphData(),
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
      const node = selection?.focusNode;
      const childNodes = Array.from(inputEl?.value?.childNodes || []);
      const index = node ? childNodes.indexOf(node as ChildNode) : -1;
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
            {...{
              value: localData.level,
              onChange: setLevel,
            }}
          >
            <option value={1}>h1</option>
            <option value={2}>h2</option>
            <option value={3}>h3</option>
            <option value={4}>h4</option>
            <option value={5}>h5</option>
            <option value={6}>h6</option>
          </SbSelect>
          <SbSelect
            {...{
              value: localData.align,
              onChange: setAlignment,
            }}
          >
            <option>left</option>
            <option>center</option>
            <option>right</option>
          </SbSelect>
        </SbToolbar>
        <p
          class="sb-heading__input"
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
