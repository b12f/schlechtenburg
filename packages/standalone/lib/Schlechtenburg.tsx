import {
  defineComponent,
  PropType,
} from 'vue';
import {
  OnUpdateBlockCb,
  IBlockDefinition,
  IBlockData,
  SbMode,
  SbMain,
} from '@schlechtenburg/core';

export interface ISchlechtenburgProps {
  availableBlocks: IBlockDefinition<any>[];
  block: IBlockData<any>;
  onUpdate: OnUpdateBlockCb;
  mode: SbMode;
}

export const Schlechtenburg = defineComponent({
  name: 'schlechtenburg',

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

  setup(props: ISchlechtenburgProps) {
    return () => <SbMain
      availableBlocks={props.availableBlocks}
      block={props.block}
      onUpdate={props.onUpdate}
      mode={props.mode}
    />;
  },
});
