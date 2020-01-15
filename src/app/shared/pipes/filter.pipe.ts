import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], filters: object, keys: string[]): any[] {
    if (!items) { return []; }
    if (filters === null) { return items; }
    console.log(items);

    const filterResults = (item) => {
      const result = keys.map(key => {
        if (item[key]) {
          return String(item[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase());
        } else {
          return false;
        }
      });
      return result.reduce((acc, cur: any) => acc && cur, 1);
    };
    return items.filter(filterResults);
  }
}
