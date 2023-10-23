import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Book from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  book!: Book;
  updateBookForm!: FormGroup;

  constructor(
    private service: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.service
      .getBookById(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.book = data;

        this.updateBookForm = this.formBuilder.group({
          id: [data.id],
          title: [data.title],
          author: [data.author],
          description: [data.description],
          rate: [data.rate],
          dateStart: [this.formatDate(data.dateStart)],
          dateRead: [this.formatDate(data.dateRead)],
        });
      });
  }

  formatDate(date?: Date) {
    if (date) {
      return new Date(date).toISOString().substring(0, 10);
    }

    return date;
  }

  onSubmit() {
    this.service.updateBook(this.updateBookForm.value).subscribe((data) => {
      this.router.navigate(['/books']);
    });
  }
}
