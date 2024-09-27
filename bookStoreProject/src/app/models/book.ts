export interface Book {
  id: number;
  title: string;
  price: number;
  publicationDate: Date;
  author: { id: number, name: string };
  category: { id: number, name: string }; 
}