import {
  defineComponent,
  reactive,
  ref,
  Ref,
  onMounted,
  watch,
} from '@vue/composition-api';
import {
  model,
  blockProps,
  BlockProps,
  useActivation,
} from '@components/TreeElement';

import SbBlock from '@internal/Block';
import SbToolbar from '@internal/Toolbar';

import './Paragraph.scss';

export default defineComponent({
  name: 'sb-paragraph',

  model,

  props: {
    ...blockProps,
  },

  setup(props: BlockProps, context) {
    const localData = reactive({
      value: props.data.value,
      focused: false,
    });

    const inputEl: Ref<null|HTMLElement> = ref(null);

    const { isActive, activate } = useActivation(props.blockId);

    onMounted(() => {
      if (inputEl.value) {
        inputEl.value.innerHTML = localData.value;

        if (isActive) {
          inputEl.value.focus();
        }
      }
    });

    watch(() => props.data, () => {
      localData.value = props.data.value;
      if (inputEl.value) {
        inputEl.value.innerHTML = localData.value;
      }
    });

    const onTextUpdate = ($event: InputEvent) => {
      localData.value = $event.target.innerHTML;
    };

    const classes = reactive({
      'sb-paragraph': true,
      'sb-paragraph_focused': localData.focused,
    });

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
        const blockId = +(new Date());
        context.emit('insert-block', {
          blockId,
          name: 'sb-paragraph',
          data: { value: '' },
        });

        activate(blockId);

        $event.preventDefault();
      }
    };

    return {
      classes,
      localData,
      onTextUpdate,
      onFocus,
      onBlur,
      onKeypress,
      inputEl,
    };
  },

  render() {
    console.log('render paragraph');
    return (
      <div class="sb-paragraph">
        <SbToolbar>Paragraph editing</SbToolbar>
        <p
          class={this.classes}
          ref="inputEl"
          contenteditable
          {...{
            on: {
              input: this.onTextUpdate,
              focus: this.onFocus,
              blur: this.onBlur,
              keypress: this.onKeypress,
            },
          }}
        ></p>
      </div>
    );
  },
});
