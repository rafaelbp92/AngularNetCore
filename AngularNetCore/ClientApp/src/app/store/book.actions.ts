import { createAction, props} from "@ngrx/store";
import Book from "../interfaces/book";

export const loadBooks = createAction('Load Books');
export const loadBooksSuccess = createAction('Load Books Success', props<{payload: Book[]}>());

export const deleteBook = createAction('Delete Book', props<{bookId: number}>());
export const deleteBookSuccess = createAction('Delete Book Success');

//export type Actions = loadBooks | loadBooksSuccess;