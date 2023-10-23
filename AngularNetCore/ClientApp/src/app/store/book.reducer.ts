import { createReducer, on, Action } from '@ngrx/store';
import { deleteBook, deleteBookSuccess, loadBooks, loadBooksSuccess } from './book.actions';
import { AppState } from './app.state';

export const initialState: AppState = {
  books: [],
};

const _bookReducer = createReducer(
  initialState,
  on(loadBooks, (state) => ({ ...state })),
  on(loadBooksSuccess, (state, { payload }) => ({ ...state, books: payload })),
);

export function BookReducer(state: AppState | undefined, action: Action) {
  return _bookReducer(state, action);
}
