# Installation

Schlechtenburg is very modular; consisting of one core package and multiple blocks. All packages are versioned together,
meaning that v2.0.3 of one package is guaranteed to work with v2.0.3 of another schlechtenburg package.

Schlechtenburg is basically one Vue component, so if you're already using Vue you can import and use it directly.
Otherwise, there's the standalone version that comes prepackaged with Vue.

## You're not yet using Vue

### Install npm packages

Install the standalone editor and any blocks you want to use:

```ts
npm i --save @schlechtenburg/standalone \
  @schlechtenburg/layout \
  @schlechtenburg/heading \
  @schlechtenburg/paragraph
```

### Initializing the editor

```ts
// Import the initialization function
import { startSchlechtenburg } from '@schlechtenburg/standalone';
import { SbMode } from '@schlechtenburg/core';

// The following are some Schlechtenburg blocks that
// will be available when editing or viewing
import {
  SbLayout,
  getDefaultData as getEmptyLayoutBlock,
} from '@schlechtenburg/layout';
import { SbHeading } from '@schlechtenburg/heading';
import { SbParagraph } from '@schlechtenburg/paragraph';
import { SbImage } from '@schlechtenburg/image';

// This will be our input state
const emptyLayout = getEmptyLayoutBlock();

// This call initializes the Schlechtenburg editor and viewer.
useSchlechtenburg(
  // Selector of the element the editor should bind to.
  // Can also the an `HTMLElement` reference.
  '#editor', 
  {
    // The input block data
    block: emptyLayout,

    // Whether Schlechtenburg is in what-you-see (editing)
    // or in what-you-get (viewing)
    mode: SbMode.Edit,

    // The list of available blocks in this editor instance
    availableBlocks: [
      SbLayout,
      SbHeading,
      SbParagraph,
      SbImage,
    ],

    // This callback will be alled any time the block data gets updated
    onUpdate: (blockData) => {
      console.log('Got new block data', blockData);

    }
  }, // 
)

```

**Note:** You need to provide both a root node

## You're already using Vue


### Install npm packages

Install the editor core and any blocks you want to use:

```
npm i --save @schlechtenburg/core \
  @schlechtenburg/layout \
  @schlechtenburg/heading \
  @schlechtenburg/paragraph
```


### Using the editor component

The following example uses TSX, but `SbMain` is just a Vue component here and can be imported and used just like any other vue component.

You need to provide a root

```tsx
// This is the main Schlechtenburg component
import { SbMain } from '@schlechtenburg/core';

// The following are some Schlechtenburg blocks that will be available when editing or viewing
import { SbLayout } from '@schlechtenburg/layout';
import { SbHeading } from '@schlechtenburg/heading';
import { SbParagraph } from '@schlechtenburg/paragraph';
import { SbImage } from '@schlechtenburg/image';

// In your component
setup () {
  // ..

  return () => <SbMain
    availableBlocks={[
      SbLayout,
      SbHeading,
      SbParagraph,
      SbImage,
    ]}
  />;
}
```
