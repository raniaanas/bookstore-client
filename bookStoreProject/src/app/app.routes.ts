import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

const routes: Routes = [
  { path: '', component: BookListComponent },  
  { path: 'add-book', component: BookFormComponent },  
  { path: 'book/:id', component: BookDetailComponent }, 
  { path : 'add-book/:id' , component: BookFormComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
   imports: [RouterModule.forRoot(routes)], 
   exports: [RouterModule]
})
export class AppRoutingModule {}
