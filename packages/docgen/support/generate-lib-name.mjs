const getTypeParamString = (params) => `&lt;${params.map(p => p.name).join(', ')}&gt;`;

export default (docs) => `
## ${docs.name}${docs.typeParameters ? getTypeParamString(docs.typeParameters) : ''}
`;
