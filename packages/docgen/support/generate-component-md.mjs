export default (docs) => `
## ${docs.exportName}

${docs.description || ''}

- **Type**: \`Component\`

### Props

${(docs.props || []).map(prop => `
#### ${prop.name}

${prop.description || ''}

${prop.type ? `
- **Type** \`${prop.type.name}\`
` : ''}
${prop.defaultValue ? `
- **Default value** \`${prop.defaultValue.value}\`
` : ''}

`).join('\n')}
`;
