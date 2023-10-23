import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../services/book.service';
import {
  deleteBook,
  deleteBookSuccess,
  loadBooks,
  loadBooksSuccess,
} from './book.actions';
import { map, mergeMap, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class BookEffects {
  constructor(
    private service: BookService,
    private actions$: Actions,
    private router: Router
  ) {}

  $loadBooks = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      mergeMap(() =>
        this.service
          .getAllBooks()
          .pipe(
            map((books) => ({ type: loadBooksSuccess.type, payload: books }))
          )
      )
    )
  );

  $deleteBook = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBook),
      mergeMap((action) =>
        this.service.deleteBook(action.bookId).pipe(
          map(() => ({ type: deleteBookSuccess.type })),
          tap(() => this.router.navigate(['/books']))
        )
      )
    )
  );
}
