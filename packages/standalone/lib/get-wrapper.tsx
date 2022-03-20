import {
  defineComponent,
  ref,
  PropType,
} from 'vue'
import {
  IBlockDefinition,
  IBlockData,
  SbMain,
  SbMode,
  OnUpdateBlockCb,
} from '@schlechtenburg/core';

/**
 *
 */
export default function getWrapper({
  block,
  mode,
  availableBlocks,
}) {
  return defineComponent({
    name: 'SchlechtenburgWrapper',

    props: {
      availableBlocks: {
        type: Array as PropType<IBlockDefinition<any>[]>,
        default: () => [],
      },
      block: {
        type: Object as PropType<IBlockData<any>>,
        required: true,
      },
      /**
       * Called when the block should be updated.
       */
      onUpdate: {
        type: (null as unknown) as PropType<OnUpdateBlockCb>,
        default: () => {},
      },
      mode: {
        type: String as PropType<SbMode>,
        validator(value: any) {
          return Object.values(SbMode).includes(value);
        },
        default: SbMode.Edit,
      },
    },

    setup(props) {
      const refBlock = ref({ ...block });
      const refMode = ref({ ...block });

      return () => <SbMain
        block={refBlock}
        availableBlocks={props.availableBlocks}
        mode={mode}
      />
    }
  });
}
