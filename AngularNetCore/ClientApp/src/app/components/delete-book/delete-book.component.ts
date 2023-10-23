import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Book from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { AppState } from 'src/app/store/app.state';
import { deleteBook } from 'src/app/store/book.actions';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css'],
})
export class DeleteBookComponent implements OnInit {
  book!: Book;
  constructor(
    private service: BookService,
    private store:  Store<{ booksState: AppState}>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service
      .getBookById(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.book = data;
      });
  }

  deleteBook(id: number) {
    this.store.dispatch(deleteBook({bookId: id}));

    // this.service.deleteBook(id).subscribe((data) => {
    //   this.router.navigate(['/books']);
    // });
  }
}
