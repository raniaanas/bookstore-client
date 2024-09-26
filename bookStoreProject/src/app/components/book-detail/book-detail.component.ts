import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';  // Import Router and ActivatedRoute
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;
  bookId: number | undefined;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,   // To get the book ID from the route
    private router: Router           // To navigate after deletion
  ) { }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));  // Get the book ID from the route
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe((book: Book) => {
        this.book = book;
      });
    }
  }

  deleteBook(id: number | undefined): void {
    if (id) {
      this.bookService.deleteBook(id).subscribe(() => {
        console.log('Book deleted successfully');
        this.router.navigate(['/']);  // Navigate back to the book list after deletion
      }, (error) => {
        console.error('Error deleting book:', error);
      });
    }
  }
}
