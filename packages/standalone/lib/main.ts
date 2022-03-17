import { createApp } from 'vue'
import {
  ISchlechtenburgProps,
  Schlechtenburg,
} from './Schlechtenburg';

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
  props:ISchlechtenburgProps,
) => {
  const app = createApp(Schlechtenburg, props as unknown as Record<string, unknown>);
  app.mount(el);

  return app;
}
