import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
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
    const bookIdStr = this.route.snapshot.paramMap.get('id');
          
    this.bookId = bookIdStr ? +bookIdStr : null;
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      publicationDate: ['', Validators.required],
      authorId: ['', Validators.required],
      categoryId: ['', Validators.required],
    });

    this.loadAuthorsAndCategories();

    if (this.bookId) {
      this.isEditMode = true;
      this.loadBookDetails(this.bookId);
    }
  }

  loadAuthorsAndCategories(): void {
    this.authorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  loadBookDetails(bookId: number): void {
    this.bookService.getBook(bookId).subscribe((book) => {
      this.bookForm.patchValue({
        title: book.title,
        price: book.price,
        publicationDate: book.publicationDate ? new Date(book.publicationDate).toISOString().substring(0, 10) : null,
        authorId: book.author ? book.author.id : null,
        categoryId: book.category ? book.category.id : null,
      });
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

    const formData = this.bookForm.value;
    
    if (this.isEditMode) {
      this.bookService.updateBook(this.bookId!, formData).subscribe(
        () => this.router.navigate(['/']),
        (error) => console.error(error)
      );
    } else {
      this.bookService.addBook(formData).subscribe(
        () => this.router.navigate(['/']),
        (error) => console.error(error)
      );
    }
  }
}
