import { Component } from 'vue';

/**
 * Schlechtenburg keeps track of the rendered block tree.
 * This is useful for e.g. the tree select component in the editor header.
 *
 * @internal
 */
export interface ITreeNode {
  id: string;
  name: string;
  icon?: string;
  children: ITreeNode[];
}

/**
 * Schlechtenburg inputs and outputs a plain JS Object that can be JSON stringified. This is the
 * interface type for that data structure. `T` will be the data type of the specific block being
 *
 * @see SbMain
 */
export interface IBlockData<T> {
  id: string;
  name: string;
  data: T;
}


/**
 * Callback type for sending full block updates. SbBlock takes this as a prop.
 *
 * ```
 * <SbBlock onUpdate={myFn as OnUpdateSelfCb}></SbBlock>
 * ```
 *
 * @see SbBlock
 */
export type OnUpdateBlockCb = (updated: IBlockData<any>) => void;

/**
 * Callback type for sending partial self-updates in edit mode.
 *
 * ```
 * props: {
 *   onUpdate: {
 *     type: (null as unknown) as PropType<OnUpdateSelfCb<IYourComponentData>>,
 *     default: () => {},
 *   },
 * }
 * ```
 *
 * @see SbBlock
 */
export type OnUpdateSelfCb<T> = (updated: Partial<T>) => void;

/**
 * Callback type for sending blocks that should be prepended as a sibling before the current block
 *
 * ```
 * props: {
 *   onPrependBlock: {
 *     type: (null as unknown) as PropType<OnPrependBlockCb<IComponentToBePrependedData>>,
 *     default: () => {},
 *   },
 * }
 * ```
 *
 * @see SbBlock
 */
export type OnPrependBlockCb =  (block: IBlockData<any>) => void;

/**
 * Callback type for sending blocks that should be appended as a sibling after the current block
 *
 * ```
 * props: {
 *   onAppendBlock: {
 *     type: (null as unknown) as PropType<OnAppendBlockCb<IComponentToBeAppendedData>>,
 *     default: () => {},
 *   },
 * }
 * ```
 *
 * @see SbBlock
 */
export type OnAppendBlockCb =  (block: IBlockData<any>) => void;

/**
 * Callback type for removing the current block.
 *
 * ```
 * props: {
 *   onRemoveSelf: {
 *     type: (null as unknown) as PropType<OnRemoveSelfCb>,
 *     default: () => {},
 *   },
 * }
 * ```
 *
 * @see SbBlock
 */
export type OnRemoveSelfCb =  () => void;

/**
 * Callback type for activating the previous block.
 *
 * ```
 * props: {
 *   onActivatePrevious: {
 *     type: (null as unknown) as PropType<OnActivatePreviousCb>,
 *     default: () => {},
 *   },
 * }
 * ```
 *
 * @see SbBlock
 */
export type OnActivatePreviousCb =  () => void;

/**
 * Callback type for activating the next block.
 *
 * ```
 * props: {
 *   onActivateNext: {
 *     type: (null as unknown) as PropType<OnActivateNextCb>,
 *     default: () => {},
 *   },
 * }
 * ```
 *
 * @see SbBlock
 */
export type OnActivateNextCb =  () => void;

/**
 * Any Block that you create
 *
 * @see IBlockDefinition
 */
export interface IBlockProps<T> {
  blockId?: string;
  data?: T,
  onUpdate?: OnUpdateSelfCb<T>;
  onPrependBlock?: OnPrependBlockCb;
  onAppendBlock?: OnAppendBlockCb;
  onRemoveSelf?: OnRemoveSelfCb;
  onActivateNext?: OnActivateNextCb;
  onActivatePrevious?: OnActivatePreviousCb;
}

/**
 * Any Block that you create
 *
 * @see IBlockProps
 */
export interface IBlockDefinition<T> {
  name: string;
  icon?: string;
  getDefaultData: T;
  edit: Component<IBlockProps<T>>;
  view: Component<IBlockProps<T>>;
}

/**
 * Schlechtenburg maintains a library of blocks that are available
 *
 * @internal
 */
export interface IBlockLibrary {
  [name: string]: IBlockDefinition<any>;
}
