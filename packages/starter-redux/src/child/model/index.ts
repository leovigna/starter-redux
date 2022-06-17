import { Interface, IdDeconstructed, getId, getIdDeconstructed, validate } from './interface.js';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as Child, IdDeconstructed as ChildId };

export { getId, getIdDeconstructed, validate };
export { getId as getChildId, validate as validateChild };
