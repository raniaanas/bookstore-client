import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute 
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
    this.checkForEditMode();
  }

  loadAuthorsAndCategories(): void {
    this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  checkForEditMode(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId) {
      this.isEditMode = true;
      this.getBook(this.bookId);
    }
  }

  getBook(id: number): void {
    this.bookService.getBook(id).subscribe((book) => {
      console.log(book , 'Edit Book ')

      const formattedDate = new Date(book.publicationDate).toISOString().split('T')[0]; // Convert to YYYY-MM-DD
      this.bookForm.patchValue({
        title: book.title,
        price: book.price,
        publicationDate: formattedDate,
        authorId: book.authorId,  
        categoryId: book.categoryId

      }); 
    });
  }
  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const bookData = this.bookForm.value;
    
    this.bookService.addBook(bookData).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => console.error('Error adding book:', error)
    );
  }
    
  onBack(): void {
    this.router.navigate(['/']); 
  }
}
