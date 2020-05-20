import { computed, defineComponent } from '@vue/composition-api';

import './Block.scss';

export default defineComponent({
  name: 'sb-block',

  props: {
    active: { type: Boolean, default: false },
  },

  setup(props, context) {
    const classes = computed(() => ({
      'sb-block': true,
      'sb-block_active': props.active,
    }));

    const activate = () => {
      if (props.active) {
        return;
      }

      context.emit('activate');
    };

    return {
      classes,
      activate,
    };
  },

  render() {
    return (
      <div
        class="sb-block"
        tabindex="0"
        {...{
          on: {
            click: this.activate,
          },
        }}
      >
        {this.$slots.toolbar}
        {this.$slots.default ? this.$slots.default : <div>Your content here</div>}
      </div>
    );
  },
});
