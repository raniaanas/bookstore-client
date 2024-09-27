import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../models/book';
import { Category } from '../../models/category';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];  // Filtered list of books
  categories: Category[] = []; // List of categories
  selectedCategoryId: number | null = null;  // Selected category for filtering

  constructor(private bookService: BookService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  // Load all books
  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
        this.filteredBooks = data;  // Initially, no filtering
      },
      (error) => {
        console.error('Error loading books', error);
      }
    );
  }

  // Load categories for the dropdown
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  // Filter books based on selected category
  filterBooksByCategory(): void {
    if (this.selectedCategoryId) {
      this.filteredBooks = this.books.filter(book => book.category.id === this.selectedCategoryId);
    } else {
      this.filteredBooks = this.books;  // Show all books if no category is selected
    }
  }

  // Delete a book
  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();  // Reload the book list after deletion
      });
    }
  }
}
