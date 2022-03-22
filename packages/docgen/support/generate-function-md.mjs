import generateLibName from './generate-lib-name.mjs';
import generateTypeMd from './generate-type-md.mjs';

const generateParameterMd = (params) => params && params.length ? `
- **Parameters**

${params.map(param => `
  - **${param.name}** \`${generateTypeMd(param.type)}\`
    ${param.comment?.shortText}
`)}
` : '';

export default (docs) => `
${generateLibName(docs)}

${docs.comment?.shortText || ''}

${generateParameterMd(docs.parameters)}
`;
