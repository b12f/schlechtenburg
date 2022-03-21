import { DeclarationReflection } from 'typedoc';
import { ComponentDoc } from 'vue-docgen-api';

import { getByName } from '../docs';
import { getShortPackageName } from './package';

const getTypeParamString = (params: TypeParameterReflection[]) => `<${params.map(p => p.name).join(', ')}>`;

const generateComponentDoc = (docs: ComponentDoc) => `
## ${docs.exportName}

<p class="docs--type">Component <code>&lt;${docs.displayName} /&gt;</code></p>

${docs.description}

### Props

${(docs.props || []).map(prop => `
#### ${prop.name}

${prop.description}

${prop.type ? `Type: <code>${prop.type.name}</code>` : ''}

${prop.defaultValue ? `Default: <code>${prop.defaultValue.value}</code>`: null}
</div>`).join('\n\n')}
`;

const generateTSDocs = (docs: DeclarationReflection) => `
## ${docs.name}${docs.typeParameters ? getTypeParamString(docs.typeParameters) : ''}

<p class="docs--type">{docs.kindString}</p>

${docs.comment?.shortText || ''}

${(docs.children || []).map((child: DeclarationReflection) => `
\`\`\`
  ${child.name}: ${child.type?.name}
\`\`\`
`).join('\n\n')}
`;

const generateChildren = (
  children: DeclarationReflection[] = [],
  components: ComponentDoc[],
) => children.map((child) => {
  const componentDocs = components.find((c: ComponentDoc) => c.exportName === child.name);
  if (componentDocs) {
    return generateComponentDoc(componentDocs);
  }

  return generateTSDocs(child);
});

/**
 * Generate the full markdown for a package
 *
 * Takes the package name (e.g. @schlechtenburg/core) and outputs a markdown string ready to be
 * consumed by vitepress
 */
export const generatePackageMd = (packageName: string) => {
  const docs = getByName(getShortPackageName(Array.isArray(packageName) ? packageName[0] : packageName));

  if (!docs) {
    return `Could not find package docs for ${packageName}`;
  }

  const { lib, components } = docs;

  const markdown = `
# ${lib.name}

${lib.comment}

${lib.flags}

${generateChildren(lib.children, components)}

  `;

  return markdown
    .trim()
    .replace(/\n\n+/, '\n\n');
}
