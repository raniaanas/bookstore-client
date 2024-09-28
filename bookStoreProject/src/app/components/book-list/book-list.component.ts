import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';  // Ensure the import is correct
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../models/book';
import { Category } from '../../models/category';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, AfterViewInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  paginatedBooks: Book[] = [];

  displayedColumns: string[] = ['no', 'title', 'author', 'price', 'publicationDate', 'actions']; // Define columns

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    this.setPaginatedBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
        this.filteredBooks = data;
        console.log(this.filteredBooks);
        this.setPaginatedBooks();
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
      this.filteredBooks = this.books.filter(
        (book) => book.categoryId === this.selectedCategoryId
      );
    } else {
      this.filteredBooks = this.books;
    }
    this.setPaginatedBooks();
  }

  setPaginatedBooks(): void {
    if (this.paginator && this.filteredBooks.length) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.paginatedBooks = this.filteredBooks.slice(startIndex, endIndex);

      this.cdr.markForCheck(); // Trigger change detection after updating data
    }
  }

  onPageChange(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.setPaginatedBooks();
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}
