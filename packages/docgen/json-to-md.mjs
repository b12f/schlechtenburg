#!/usr/bin/env node

import {
  join,
  resolve,
} from 'path';
import debounce from 'lodash/debounce.js';
import {
  writeFile,
  readFile,
  watch,
} from 'fs/promises';
import generatePackageMd from './support/generate-pkg-md.mjs'; 
import combine from './support/combine.mjs'; 

// Either 'build' or 'watch'
const COMMAND = process.argv[2];

const PKG_DIR = join(process.cwd() || process.argv[3]);
const COMPONENT_DOCS_FILE_PATH = join(PKG_DIR, 'docs', 'components.json');
const TS_DOCS_FILE_PATH = join(PKG_DIR, 'docs', 'lib.json');

(async () => {
  const pkg = JSON.parse(await readFile('./package.json'));
  const pkgSpace = pkg.name.split('/')[0];
  const pkgName = pkg.name.split('/')[1];
  const apiDocsDir = resolve(PKG_DIR, '..', `docs/lib/api/${pkgSpace}`);

  const readTransFormAndWriteOut = async () => {
    console.log(`Got update for ${pkgName}`);
    const components = JSON.parse(await readFile(COMPONENT_DOCS_FILE_PATH));
    const lib = JSON.parse(await readFile(TS_DOCS_FILE_PATH));

    console.log(`Writing ${pkgName}.md`);
    await writeFile(join(apiDocsDir, `${pkgName}.md`), generatePackageMd({ components, lib }));
  };

  switch (COMMAND) {
    case 'build':
      await readTransFormAndWriteOut(apiDocsDir);
      return;
    case 'watch':
      await readTransFormAndWriteOut(apiDocsDir);

      const componentWatcher = watch(COMPONENT_DOCS_FILE_PATH);
      const libWatcher = watch(TS_DOCS_FILE_PATH);
      for await (const event of combine([componentWatcher, libWatcher])) {
        debounce(readTransFormAndWriteOut, 500);
      }
      return;
    default:
      console.log('Please provide either build or watch as a command');
  };
})();
