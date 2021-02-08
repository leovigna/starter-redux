import { createSelector } from 'redux-orm';
import { Fields, Model } from './model';
import orm from '../orm';

const name = Model.modelName;

type selectWithIdSingle = (state: any, id?: number) => Fields;
type selectWithIdMany = (state: any, ids?: number[]) => Fields[];
export const selectWithId: selectWithIdSingle | selectWithIdMany = createSelector(orm[name]);

type selectBooksSingle = (state: any, id?: number) => Fields;
type selectBooksMany = (state: any, ids?: number[]) => Fields[];
export const selectBooks = createSelector(orm.Author.books);
