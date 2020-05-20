import {
  defineComponent,
  reactive,
  ref,
  onMounted,
} from '@vue/composition-api';
import {
  model,
  treeElementProps,
  useDynamicComponents,
} from '@components/TreeElement';

import SbBlock from '@internal/Block';
import SbToolbar from '@internal/Toolbar';

import './Paragraph.scss';

export default defineComponent({
  name: 'sb-paragraph',

  model,

  props: {
    ...treeElementProps,
  },

  setup(props, context) {
    const { localTree } = useTree(props);

    const onTextUpdate = ($event: InputEvent) => {
      localTree.value = $event.target.innerHTML;
    };

    const focused = ref(false);

    const classes = reactive({
      'sb-paragraph': true,
      'sb-paragraph_focused': focused,
    });

    const onFocus = () => {
      console.log('focus');
      focused.value = true;
    };
    const onBlur = () => {
      console.log('blur');
      focused.value = false;
      context.emit('tree', {
        value: localTree.value.value,
      });
    };

    const inputEl = ref(null);

    onMounted(() => {
      console.log(inputEl);
      inputEl.value.innerHTML = localTree.value;
    });

    return {
      classes,
      localTree,
      onTextUpdate,
      focused,
      onFocus,
      onBlur,
      inputEl,
    };
  },

  render() {
    return (
      <SbBlock>
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
            },
          }}
        ></p>
      </SbBlock>
    );
  },
});
