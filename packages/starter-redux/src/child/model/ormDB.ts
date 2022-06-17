// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class ChildDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name,
    primary: 'id',
    ormClass: ChildDBModel,
    columns: [
        {
            name: 'firstName',
            index: 'firstName',
        },
        {
            name: 'lastName',
            index: 'lastName',
        },
        {
            name: 'age',
            index: 'age',
        },
    ],
};

export default ChildDBModel;
