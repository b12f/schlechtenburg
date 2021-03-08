import { v4 as uuidv4 } from 'uuid';

export const generateBlockId = uuidv4;

export const model = {
  prop: 'block',
  event: 'update',
};

export const blockProps = {
  blockId: {
    type: String,
    default: generateBlockId,
  },
};
