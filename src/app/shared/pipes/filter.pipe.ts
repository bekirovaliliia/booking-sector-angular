import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], filters: object, keys: string[]): any[] {
    if (!items) { return []; }
    if (filters === null) { return items; }
    console.log(items);

    const filterTour = (tour) => {
      let result = keys.map(key => {
        if (tour[key]) {
          return String(tour[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
        } else {
          return false;
        }
      });
      return result.reduce((acc, cur: any) => { return acc & cur }, 1);
    };
    return items.filter(filterTour);
  }
}
