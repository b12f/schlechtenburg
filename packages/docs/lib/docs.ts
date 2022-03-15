import { ComponentDoc } from 'vue-docgen-api';
import { ProjectReflection } from 'typedoc';

import { getShortPackageName } from './package';

import coreComponents from '@schlechtenburg/core/docs/components.json';
import coreLib from '@schlechtenburg/core/docs/lib.json';

import layoutComponents from '@schlechtenburg/layout/docs/components.json';
import layoutLib from '@schlechtenburg/layout/docs/lib.json';

import headingComponents from '@schlechtenburg/heading/docs/components.json';
import headingLib from '@schlechtenburg/heading/docs/lib.json';

import paragraphComponents from '@schlechtenburg/paragraph/docs/components.json';
import paragraphLib from '@schlechtenburg/paragraph/docs/lib.json';

import imageComponents from '@schlechtenburg/image/docs/components.json';
import imageLib from '@schlechtenburg/image/docs/lib.json';

export interface IDocs {
  components: ComponentDoc;
  lib: ProjectReflection;
};

export const core = {
  lib: coreLib,
  components: coreComponents,
} as unknown as IDocs;

export const layout = {
  lib: layoutLib,
  components: layoutComponents,
} as unknown as IDocs;

export const heading = {
  lib: headingLib,
  components: headingComponents,
} as unknown as IDocs;

export const paragraph = {
  lib: paragraphLib,
  components: paragraphComponents,
} as unknown as IDocs;

export const image = {
  lib: imageLib,
  components: imageComponents,
} as unknown as IDocs;

export const getByName = (name: string) => ({
  core,
  layout,
  heading,
  paragraph,
  image,
})[name];

