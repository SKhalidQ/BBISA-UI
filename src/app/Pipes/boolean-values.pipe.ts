import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanValues',
})
export class BooleanValuesPipe implements PipeTransform {
  public transform(value: string): any {
    return value == 'true' ? 'Yes' : 'No';
  }
}
