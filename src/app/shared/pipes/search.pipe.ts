import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], search: string, keys: string[]): any[] {
    if (!items) { return []; }
    if (search === '') { return items; }

    const searchResults = (item) => {
      const result = keys.map(key => {
        if (item[key]) {
          return String(item[key]).toLowerCase().includes(search.toLowerCase());
        } else {
          return false;
        }
      });
      return result.reduce((acc, cur: any) => acc || cur, 0);
    };
    return items.filter(searchResults);
  }

}
