import { Component, OnInit } from '@angular/core';
import Book from '../../interfaces/book';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { loadBooks } from 'src/app/store/book.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  public books$: Observable<any>;

  constructor(private store: Store<{ booksState: AppState}>, private router: Router){
    this.books$ = store.select(state => state.booksState.books);
  }
  
  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }

  showBook(id: number) {
    this.router.navigate([`/show-book/${id}`]);
  }

  updateBook(id: number) {
    this.router.navigate([`/update-book/${id}`]);
  }

  deleteBook(id: number) {
    this.router.navigate([`/delete-book/${id}`]);
  }
}
