import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule for routing
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Add RouterModule here
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // Logic to get book details
  }
}
