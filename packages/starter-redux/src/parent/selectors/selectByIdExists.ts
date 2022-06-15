import selectByIdSingle from './selectByIdSingle.js';
import { IdArgs } from '../model/interface.js';

export function selectByIdExists(state: any, id: IdArgs | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;
