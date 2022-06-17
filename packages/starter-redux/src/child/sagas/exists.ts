import { select } from 'typed-redux-saga';
import { name } from '../common.js';
import { selectByIdSingle } from '../selectors/index.js';
import { Id } from '../model/interface.js';

function* exists(id: Id) {
    const result = yield* select(selectByIdSingle, id);
    if (!result) throw new Error(`${name} ${id} ${result}`);
    return result;
}

export default exists;
