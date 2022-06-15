import select from './select.js';
import { Interface, IdArgs, getId } from '../model/interface.js';

export function selectByIdMany(state: any, ids?: IdArgs[]): (Interface | null)[] {
    if (!ids) return select(state); //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr);
    return result;
}

export default selectByIdMany;
