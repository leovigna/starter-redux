import { Interface, Id, IdArgs, getId, getIdDeconstructed, validate } from './interface';
import Model from './orm';

export type { Interface, Id, IdArgs, Model };
//alias
export type { Interface as Parent };

export { getId, getIdDeconstructed, validate };
export { getId as getParentId, validate as validateParent };
