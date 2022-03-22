import generateComponentMd from './generate-component-md.mjs';
import generateFunctionMd from './generate-function-md.mjs';
import generateTypeMd from './generate-type-md.mjs';
import generateEnumMd from './generate-enum-md.mjs';
import generateInterfaceMd from './generate-interface-md.mjs';

const generateMembersDocs = (children) => children ? `
- **Members**
${(children)
  .map((child) => `   - **${child.name}**: \`${child.type?.name}\``)
  .join('\n')}
` : '';

const generateTSDocs = (docs) => {
  switch (docs.kindString) {
    case 'Function': return generateFunctionMd(docs.signatures[0]); // There are currently no functions with multiple sigs
    case 'Enumeration': return generateEnumMd(docs);
    case 'Interface': return generateInterfaceMd(docs);
    case 'Type alias': return generateTypeMd(docs);
    default: return `

${docs.comment?.shortText || ''}

- **Type** \`${docs.kindString}\`

${generateMembersDocs(docs.children)}
`;
  }
}

const generateChildren = (
  children = [],
  components,
) => children.map((child) => {
  const componentDocs = components.find((c) => c.exportName === child.name);
  if (componentDocs) {
    return generateComponentMd(componentDocs);
  }

  return generateTSDocs(child);
}).join('');

/**
 * Generate the full markdown for a package
 *
 * Takes the package name (e.g. @schlechtenburg/core) and outputs a markdown string ready to be
 * consumed by vitepress
 */
export default ({ lib, components }) => {
  const markdown = `
# ${lib.name}

${lib.comment ? lib.comment : ''}

${generateChildren(lib.children, components)}

  `;

  return markdown
    .trim()
    .replace(/\n\n+/, '\n\n');
}
