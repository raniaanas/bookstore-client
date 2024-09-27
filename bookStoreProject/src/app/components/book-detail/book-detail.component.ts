import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'; 
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;
  bookId: number | undefined;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,   
    private router: Router          
  ) { }

  ngOnInit(): void {
    debugger;
    console.log('111')
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.getBook(bookId);
    }
  }

  getBook(id: string): void {
    this.bookService.getBook(+id).subscribe((data) => {
      this.book = data;
    }, (error) => {
      console.error('Error fetching book:', error);
      // Optionally navigate back or show a message
      this.router.navigate(['/']);
    });
  }
  

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      console.log('Book deleted successfully');
      this.router.navigate(['/']);
    }, (error) => {
      console.error('Error deleting book:', error);
    });
  }
}

 
