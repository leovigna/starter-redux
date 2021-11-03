import { Interface, IdDeconstructed, getId, getIdDeconstructed, validate } from './interface';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as Parent, IdDeconstructed as ParentId };

export { getId, getIdDeconstructed, validate };
export { getId as getParentId, validate as validateParent };
