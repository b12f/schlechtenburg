import {
  createApp,
} from 'vue'
import {
  ISbMainProps,
  IBlockData,
  SbMain,
} from '@schlechtenburg/core';

/**
 *
 */
export const startSchlechtenburg = async (
  /**
   * The element on which the editor schould be mounted
   */
  el:HTMLElement|string,

  /**
   * The schlechtenburg props
   */
  props:ISbMainProps,
) => {
  let block = { ...props.block };
  const app = createApp(SbMain, {
    ...props,
    onUpdate: (update: IBlockData<any>) => {
      block = update;
      props.onUpdate(update);
    },
  }as unknown as Record<string, unknown>);
  app.mount(el);

  return {
    getBlock() {
      return block;
    },
  };
}
