#!/usr/bin/env node

import { parse } from 'vue-docgen-api'
import { join } from 'path'
import glob from 'glob-promise'
import TypeDoc from 'typedoc'
import { writeFile, readFile } from 'fs/promises'

const DOCS_PATH = join(process.cwd(), process.argv[2] || './docs');
const LIB_PATH = join(process.cwd(), process.argv[3] || './lib');

const transformTSDocs = (docs) => {
  return {
    ...docs,
    children: docs.children.map(child => ({
      ...child,
      typeParameters: child.typeParameter,
    })),
  };
};

const getTSDocs = async (outputFile) => {
  const app = new TypeDoc.Application();
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.bootstrap({
    entryPoints: ['lib/index.ts'],
    json: 'docs',
    excludeExternals: true,
  });

  const project = app.convert();
  await app.generateJson(project, outputFile);
  const data = JSON.parse(await readFile(outputFile));
  await writeFile(outputFile, JSON.stringify(transformTSDocs(data), null, 2))
};

const getVueComponentDocs = async (dir) => {
  const found = await glob(join(dir, '/**/*'));
  const files = found
    .filter(found_path => found_path.match(/\.(tsx|jsx|vue)$/));

  const vueParsed = await Promise.all(files
    .map(file => parse(file)
      .catch((error) => {
        // For now, ignore any errors
        // console.log(error, file);
        return null;
      })
    )
  );
  const vueFiltered = vueParsed.filter(p => p);
  return vueFiltered;
};

(async () => {
  await Promise.all([
    (() => {
      const tsDocsOutput = join(DOCS_PATH, 'lib.json');
      return getTSDocs(tsDocsOutput);
    })(),

    (async () => {
      const vueComponents = await getVueComponentDocs(LIB_PATH);
      const componentJsonPath = join(DOCS_PATH, 'components.json');
      console.log(`Info: JSON written to ${componentJsonPath}`);
      return writeFile(componentJsonPath, JSON.stringify(vueComponents, null, 2));
    })(),
  ])
})();
