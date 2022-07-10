import { IndexableTypeArray } from 'dexie';

/* Compound indices are joined with separator */
export const SEPARATOR = '-';
export function toReduxOrmId(id: IndexableTypeArray) {
    return id.join(SEPARATOR);
}

export default toReduxOrmId;
