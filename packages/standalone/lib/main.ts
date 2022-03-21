import { createApp } from 'vue'
import { ISbMainProps } from '@schlechtenburg/core';
import getWrapper from './get-wrapper';

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
  const {
    SchlechtenburgWrapper,
    getBlock,
    setBlock,
    getMode,
    setMode,
  } = getWrapper();

  const app = createApp(
    SchlechtenburgWrapper,
    { ...props, } as unknown as Record<string, unknown>,
  );
  app.mount(el);

  return {
    app,
    getBlock,
    setBlock,
    getMode,
    setMode,
  };
}
