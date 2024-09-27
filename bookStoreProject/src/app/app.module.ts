import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { FilterPipe } from './pipes/filter.pipe';  

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    FilterPipe,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule, 
    FormsModule,         
    ReactiveFormsModule, 
    RouterModule.forRoot([]),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
