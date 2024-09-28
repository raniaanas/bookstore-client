import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, selectedCategoryId: number | null): any[] {
    if (!items) {
      return [];
    }

    // If there's a search term, filter by title
    let filteredItems = items;
    if (searchTerm) {
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // If there's a selected category, filter by category
    if (selectedCategoryId !== null) {
      filteredItems = filteredItems.filter(item => item.categoryId === selectedCategoryId);
    }

    return filteredItems;
  }
}
