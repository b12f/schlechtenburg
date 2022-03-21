import {
  defineComponent,
  ref,
  Ref,
  PropType,
} from 'vue'
import {
  IBlockDefinition,
  IBlockData,
  SbMain,
  SbMode,
  OnUpdateBlockCb,
  ISbMainProps,
} from '@schlechtenburg/core';

/**
 *
 */
export default function getWrapper() {
  const refBlock: Ref<IBlockData<any>|null> = ref(null);
  const refMode = ref(SbMode.View);

  const SchlechtenburgWrapper = defineComponent({
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

    setup(props: ISbMainProps) {
      refBlock.value = { ...(props.block) };
      refMode.value = props.mode;

      if (!refBlock.value) {
        return () => <div class="sb-message sb-message_error">An Error occurred</div>;
      }

      return () => <SbMain
        block={refBlock.value as IBlockData<any>}
        availableBlocks={props.availableBlocks}
        mode={refMode.value}
        onUpdate={(newBlock: IBlockData<any>) => {
          refBlock.value = { ...newBlock };

        }}
      />
    }
  });

  return {
    SchlechtenburgWrapper,
    getBlock() {
      return refBlock.value;
    },
    setBlock(block: IBlockData<any>) {
      refBlock.value = { ...block };
    },
    getMode() {
      return refMode.value;
    },
    setMode(mode: SbMode) {
      refMode.value = mode;
    },
  };
}
