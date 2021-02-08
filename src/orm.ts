import { ORM } from 'redux-orm';
import * as Author from './author';
import * as Book from './book';

const orm = new ORM({
    stateSelector: (state: any) => state.orm,
});
orm.register(Author.Model);
orm.register(Book.Model);

export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();
    return state;
};

type Action = {
    type: string;
    payload: any;
    [key: string]: any;
};

export function reducer(state: any, action: Action) {
    const sess = orm.session(state || initializeState(orm));

    switch (action.type) {
        case Author.CREATE:
        case Author.UPDATE:
        case Author.REMOVE:
            Author.reducer(sess, action as Author.Action);
        case Book.CREATE:
        case Book.UPDATE:
        case Book.REMOVE:
            Book.reducer(sess, action as Book.Action);
    }

    return sess.state;
}

export default orm;
