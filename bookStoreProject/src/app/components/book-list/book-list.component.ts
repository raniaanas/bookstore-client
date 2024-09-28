import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../models/book';
import { Category } from '../../models/category';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component'; // Import dialog component
import { MatSnackBar } from '@angular/material/snack-bar'; 


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
  bookIdToDelete: number | null = null;

  displayedColumns: string[] = ['no', 'title', 'author', 'price', 'publicationDate', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
 
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
        console.log('Books Loaded:', this.books);
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
        console.log('Categories Loaded:', this.categories);  // Log all categories to see if ID 1 exists
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }


  filterBooksByCategory(): void {
    console.log('Selected Category ID:', this.selectedCategoryId);
  
    const selectedCategoryIdNumber = Number(this.selectedCategoryId);  // Explicitly cast to number
  
    if (selectedCategoryIdNumber === null || isNaN(selectedCategoryIdNumber)) {
      console.log('No category selected, showing all books.');
      this.filteredBooks = this.books;
    } else {
      // Find the selected category's name by ID
      const selectedCategory = this.categories.find(
        (category) => category.id === selectedCategoryIdNumber  // Make sure the types are aligned
      );
  
      if (selectedCategory) {
        const selectedCategoryName = selectedCategory.name;
        console.log('Selected Category Name:', selectedCategoryName);
  
        // Now filter books by categoryName
        this.filteredBooks = this.books.filter((book) => {
          console.log(`Filtering Book Title: ${book.title}, Book Category: ${book.categoryName}, Selected Category: ${selectedCategoryName}`);
          return book.categoryName === selectedCategoryName;
        });
  
        console.log('Filtered Books:', this.filteredBooks);
      } else {
        console.warn('No matching category found for the selected category ID.');
      }
    }
  
    // Reset the paginator after filtering
    this.paginator.firstPage();
    this.setPaginatedBooks();
  }
  
  

  setPaginatedBooks(): void {
    if (this.paginator && this.filteredBooks.length) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;
      this.paginatedBooks = this.filteredBooks.slice(startIndex, endIndex);
  
      this.cdr.markForCheck();  // Trigger change detection after updating data
    }
  }

  onPageChange(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.setPaginatedBooks();
  }

  openDeleteModal(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { title: 'Are you sure you want to delete this book?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook(id);
      }
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(
      () => {
        // Success Notification
        this.snackBar.open('Book deleted successfully!', 'Close', {
          duration: 3000,  // Display the notification for 3 seconds
          panelClass: ['snackbar-success']  // Add custom styles if you want
        });
        this.loadBooks(); // Reload books after deletion
      },
      (error) => {
        // Error Notification
        this.snackBar.open('Failed to delete book. Please try again.', 'Close', {
          duration: 3000,  // Display the notification for 3 seconds
          panelClass: ['snackbar-error']  // Add custom styles if you want
        });
        console.error('Error deleting book:', error);
      }
    );
  }
}
