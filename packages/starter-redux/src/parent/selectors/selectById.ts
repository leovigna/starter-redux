import selectByIdMany from './selectByIdMany.js';
import selectByIdSingle from './selectByIdSingle.js';

export function selectById(state: any, id?: string | string[]) {
    if (!id) return selectByIdMany(state); //Return all

    if (Array.isArray(id)) {
        return selectByIdMany(state, id);
    } else {
        return selectByIdSingle(state, id);
    }
}

export default selectById;
