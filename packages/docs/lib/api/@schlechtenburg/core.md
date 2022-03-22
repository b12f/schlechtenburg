# @schlechtenburg/core

## SbMode

The mode the Schlechtenburg editor is currently in

- **Type** `Enumeration`


- **Members**
   - **Edit**: `undefined`
   - **View**: `undefined`


## IBlockData&lt;T&gt;

Schlechtenburg inputs and outputs a plain JS Object that can be JSON stringified. This is the
interface type for that data structure. `T` will be the data type of the specific block being

- **Type** `Interface`


- **Members**
   - **data**: `T`
   - **id**: `string`
   - **name**: `string`


## IBlockDefinition&lt;T&gt;

Any Block that you create

- **Type** `Interface`


- **Members**
   - **edit**: `Component`
   - **getDefaultData**: `T`
   - **icon**: `string`
   - **name**: `string`
   - **view**: `Component`


## IBlockLibrary

Schlechtenburg maintains a library of blocks that are available

- **Type** `Interface`



## IBlockProps&lt;T&gt;

Any Block that you create

- **Type** `Interface`


- **Members**
   - **blockId**: `string`
   - **data**: `T`
   - **onActivateNext**: `OnActivateNextCb`
   - **onActivatePrevious**: `OnActivatePreviousCb`
   - **onAppendBlock**: `OnAppendBlockCb`
   - **onPrependBlock**: `OnPrependBlockCb`
   - **onRemoveSelf**: `OnRemoveSelfCb`
   - **onUpdate**: `OnUpdateSelfCb`


## ISbMainProps



- **Type** `Interface`


- **Members**
   - **availableBlocks**: `undefined`
   - **block**: `IBlockData`
   - **mode**: `SbMode`
   - **onUpdate**: `OnUpdateBlockCb`


## ITreeNode

Schlechtenburg keeps track of the rendered block tree.
This is useful for e.g. the tree select component in the editor header.

- **Type** `Interface`


- **Members**
   - **children**: `undefined`
   - **icon**: `string`
   - **id**: `string`
   - **name**: `string`


## OnActivateNextCb



- **Type** `Type alias`



## OnActivatePreviousCb



- **Type** `Type alias`



## OnAppendBlockCb



- **Type** `Type alias`



## OnPrependBlockCb



- **Type** `Type alias`



## OnRemoveSelfCb



- **Type** `Type alias`



## OnUpdateBlockCb



- **Type** `Type alias`



## OnUpdateSelfCb&lt;T&gt;



- **Type** `Type alias`



## SbBlock

Displays a Schlechtenburg block either the mode of the schlechtenburg instance.
You can use this to display child blocks inside your own blocks.

- **Type**: `Component`

### Props


#### block

The state for the block.


- **Type** `IBlockData<any>`





#### onUpdate

Called when the block should be updated.


- **Type** `OnUpdateBlockCb`


- **Default value** `() => {}`




#### onPrependBlock

Called when a sibling block should be inserted before the block


- **Type** `OnPrependBlockCb`


- **Default value** `() => {}`




#### onAppendBlock

Called when a sibling block should be inserted after the block


- **Type** `OnAppendBlockCb`


- **Default value** `() => {}`




#### onRemoveSelf

Called when the block should be removed


- **Type** `OnRemoveSelfCb`


- **Default value** `() => {}`




#### onActivatePrevious

Called when the previous sibling block should be activated


- **Type** `OnActivatePreviousCb`


- **Default value** `() => {}`




#### onActivateNext

Called when the next sibling block should be activated


- **Type** `OnActivateNextCb`


- **Default value** `() => {}`




## SbBlockOrdering



- **Type**: `Component`

### Props


#### orientation




- **Type** `string`


- **Default value** `null`




#### onRemove




- **Type** `func`


- **Default value** `() => {}`




#### onMoveBackward




- **Type** `func`


- **Default value** `() => {}`




#### onMoveForward




- **Type** `func`


- **Default value** `() => {}`




## SbBlockPicker



- **Type**: `Component`

### Props


#### onPickedBlock




- **Type** `func`


- **Default value** `() => {}`




## SbBlockPlaceholder

A placeholder for a block.
Displays a placeholder for a block, allowing the user to select a block to insert.

- **Type**: `Component`

### Props


#### onInsertBlock

Called when the user picked a block that should be inserted here.


- **Type** `func`


- **Default value** `() => {}`




## SbButton

A button in the schlechtenburg theme

- **Type**: `Component`

### Props



## SbMain



- **Type** `Variable`



## SbSelect

A select input in the schlechtenburg theme

- **Type**: `Component`

### Props



## SbToolbar

Toolbar in the schlechtenburg theme

- **Type**: `Component`

### Props



## SymActiveBlock



- **Type** `Variable`



## SymBlockDimensions



- **Type** `Variable`



## SymBlockLibrary



- **Type** `Variable`



## SymEditorDimensions



- **Type** `Variable`



## SymMode



- **Type** `Variable`



## blockProps



- **Type** `Variable`



## model



- **Type** `Variable`



## generateBlockId



- **Type** `Function`



## useActivation



- **Type** `Function`



## useBlockSizing



- **Type** `Function`



## useDynamicBlocks



- **Type** `Function`



## useResizeObserver



- **Type** `Function`