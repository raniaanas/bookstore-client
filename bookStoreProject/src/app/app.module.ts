import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule  } from '@angular/router';  
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from '../app/app.routes';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { FilterPipe } from './pipes/filter.pipe';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    BookDetailComponent,
    FilterPipe,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule, 
    FormsModule,         
    ReactiveFormsModule, 
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule
    
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {}
