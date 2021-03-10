import {
  defineComponent,
  inject,
} from 'vue';
import { ExampleSymbol } from '../use-dynamic-blocks';

export const SbBlock = defineComponent({
  name: 'sb-block',

  setup() {
    console.log('block setup');
    const example = inject(ExampleSymbol);
    console.log('block setup after inject', example);

    return () => <div>Block: {example}</div>;
  },
});
