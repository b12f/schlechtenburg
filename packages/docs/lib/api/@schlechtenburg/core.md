# @schlechtenburg/core

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






- **Type** `Variable`



## SbSelect

A select input in the schlechtenburg theme

- **Type**: `Component`

### Props



## SbToolbar

Toolbar in the schlechtenburg theme

- **Type**: `Component`

### Props






- **Type** `Variable`






- **Type** `Variable`






- **Type** `Variable`






- **Type** `Variable`






- **Type** `Variable`






- **Type** `Variable`






- **Type** `Variable`




## generateBlockId





- **Params**



## useActivation





- **Params**



## useBlockSizing





- **Params**



## useDynamicBlocks





- **Params**



## useResizeObserver





- **Params**