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
  filteredBooks: Book[] = []; 
  categories: Category[] = []; 
  selectedCategoryId: number | null = null;  

  constructor(private bookService: BookService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }


  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
        this.filteredBooks = data; 
        console.log(data);
      },
      (error) => {
        console.error('Error loading books', error);
      }
    );
  }

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

  filterBooksByCategory(): void {
    if (this.selectedCategoryId) {
      this.filteredBooks = this.books.filter(book => book.categoryId === this.selectedCategoryId);
    } else {
      this.filteredBooks = this.books;  
    }
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();  
      });
    }
  }
}
