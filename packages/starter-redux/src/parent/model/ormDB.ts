// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class ParentDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name, //name of table
    primary: 'id', //auto increment field (default id)
    ormClass: ParentDBModel,
    columns: [
        {
            name: 'firstName', //other indexes in the database
            index: [],
        },
        {
            name: 'lastName',
            index: [],
        },
        {
            name: 'age',
            index: [],
        },
    ],
};

export default ParentDBModel;
