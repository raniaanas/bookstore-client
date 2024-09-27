import { Author }  from './Author';
import {Category} from './Category';


export class Book {
  id?: number ;
  title?: string;
  price?: number;
  publicationDate?: Date;
  author?: Author;  
  category?: Category;  
}