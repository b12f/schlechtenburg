import { ComponentDoc } from 'vue-docgen-api';
import { ProjectReflection } from 'typedoc';

import coreComponents from '@schlechtenburg/core/docs/components.json';
import coreLib from '@schlechtenburg/core/docs/lib.json';

export interface IDocs {
  components: ComponentDoc;
  lib: ProjectReflection;
};

export const core = {
  lib: coreLib,
  components: coreComponents,
};
