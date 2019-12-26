import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(objects: any[], filterText: string): any {
    return objects ? objects.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}
