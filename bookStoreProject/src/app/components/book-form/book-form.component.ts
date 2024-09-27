import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  authors: any[] = [];
  categories: any[] = [];
  isEditMode = false;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      publicationDate: ['', Validators.required],
      authorId: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAuthorsAndCategories();
  }

  loadAuthorsAndCategories(): void {
    this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const bookData = this.bookForm.value;
    
    this.bookService.addBook(bookData).subscribe(
      () => {
        this.router.navigate(['/']); // Navigate to the book list after adding
      },
      (error) => console.error('Error adding book:', error)
    );
  }
     // Method to handle the Back button click
  onBack(): void {
    this.router.navigate(['/']);  // Navigate back to the book list
  }
}
