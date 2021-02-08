import { assert } from 'chai';
import { createStore } from './store';
import * as Author from './author';
import * as Book from './book';

describe('redux-orm', () => {
    let store: ReturnType<typeof createStore>;
    beforeEach(() => {
        store = createStore();
    });
    it('create', async () => {
        store.dispatch(Author.create({ name: 'Shakespeare' }));
        store.dispatch(Book.create({ name: 'Romeo & Juliet', authorId: 0 }));

        const state = store.getState();

        const expectedAuthorState = {
            0: { name: 'Shakespeare' },
        };
        const expectedAuthorSelected = [{ name: 'Shakespeare' }];
        assert.deepEqual(state.orm['Author'].itemsById, expectedAuthorState, 'state.orm.Author.itemsById');
        assert.deepEqual(Author.selectWithId(state), expectedAuthorSelected, 'Author.selectWithId');

        const expectedBookState = {
            0: { name: 'Romeo & Juliet', authorId: 0 },
        };
        const expectedBookSelected = [{ name: 'Romeo & Juliet', authorId: 0, author: { name: 'Shakespeare' } }];
        assert.deepEqual(state.orm['Book'].itemsById, expectedBookState, 'state.orm.Book.itemsById');
        assert.deepEqual(Book.selectWithId(state), expectedBookSelected, 'Book.selectWithId');
    });
});
