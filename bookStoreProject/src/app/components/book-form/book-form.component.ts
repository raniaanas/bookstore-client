import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel and forms
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterModule],  // Import FormsModule here
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  book: Book = {
    id: 0,
    title: '',
    author: '',
    price: 0,
    publicationDate: new Date(),
  };
  isEditMode: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // Logic for initializing book data or handling edit mode
  }

  onSubmit(): void {
    // Submit form logic
  }
}
