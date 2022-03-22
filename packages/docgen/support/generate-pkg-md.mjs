const getTypeParamString = (params) => `&lt;${params.map(p => p.name).join(', ')}&gt;`;

const generateComponentDoc = (docs) => `
## ${docs.exportName}

${docs.description || ''}

- **Type**

  \`\`\`
    Component
  \`\`\`

### Props

${(docs.props || []).map(prop => `
#### ${prop.name}

${prop.description || ''}

${prop.type ? `
- **Type**
  \`\`\`
    ${prop.type.name}
  \`\`\`
` : ''}
${prop.defaultValue ? `
- **Default value**
  \`\`\`
    ${prop.defaultValue.value}
  \`\`\`
` : ''}

`).join('\n')}
`;

const generateTSDocs = (docs) => `
## ${docs.name}${docs.typeParameters ? getTypeParamString(docs.typeParameters) : ''}

${docs.comment?.shortText || ''}

- **Type**
  \`\`\`
    ${docs.kindString}
  \`\`\`

- **Members**
${(docs.children || [])
  .map((child) => `   - **${child.name}**: \`${child.type?.name}\``)
  .join('\n')}
`;

const generateChildren = (
  children = [],
  components,
) => children.map((child) => {
  const componentDocs = components.find((c) => c.exportName === child.name);
  if (componentDocs) {
    return generateComponentDoc(componentDocs);
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
