import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanValues'
})
export class BooleanValuesPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? "Yes" : "No";
  }

}
