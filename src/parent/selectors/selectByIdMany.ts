import select from './select';
import Interface, { IdArgs, getId } from '../model/interface';

function selectByIdMany(state: any, ids?: IdArgs[]): (Interface | null)[] {
    if (!ids) return select(state); //Return all

    const idsStr = ids.map((id) => getId(id));
    return select(state, idsStr);
}

export default selectByIdMany;
