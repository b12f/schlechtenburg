import { createApp } from 'vue'
import { ISbMainProps } from '@schlechtenburg/core';
import getWrapper from './get-wrapper';

/**
 * Initializes the Schlechtenburg editor
 *
 * @param el The element on which the editor schould be mounted
 * @param props The Schlechtenburg props
 *
 * @returns A set of functions to interact with the live Schlechtenburg instance
 *
 * @See ISbMainProps
 * @See SbMain
 */
export const startSchlechtenburg = async (
  el:HTMLElement|string,
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
    getBlock,
    setBlock,
    getMode,
    setMode,
  };
}
