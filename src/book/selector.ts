import { createSelector } from 'redux-orm';
import { Fields, Model } from './model';
import orm from '../orm';

const name = Model.modelName;

type selectWithIdSingle = (state: any, id?: Fields['name']) => Fields;
type selectWithIdMany = (state: any, ids?: Fields['name'][]) => Fields[];
export const selectWithId: selectWithIdSingle | selectWithIdMany = createSelector(orm[name]);
