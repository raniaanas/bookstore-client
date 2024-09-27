import {Author} from './author';
import {Category} from './category';

export interface Book {
  id: number;
  title: string;
  price: number;
  publicationDate: Date;
  authorName: Author['name'];
  categoryName: Category['name'];
  categoryId : Category['id'];
  authorId : Author['id'];
}