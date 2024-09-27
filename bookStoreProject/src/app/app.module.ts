import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule  } from '@angular/router';  
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app/app.routes';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { FilterPipe } from './pipes/filter.pipe';  

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
