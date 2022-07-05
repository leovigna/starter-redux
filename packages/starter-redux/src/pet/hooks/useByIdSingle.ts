import { useLiveQuery } from 'dexie-react-hooks';
import { getDB } from '../model/db.js';

export function useByIdSingle(id: number | undefined) {
    if (!id) return undefined;
    const selected = useLiveQuery(() => getDB().pets.get(id));
    return selected;
}

export default useByIdSingle;
