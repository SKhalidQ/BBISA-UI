import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockBoolean',
})
export class StockBooleanPipe implements PipeTransform {
  transform(value: number): any {
    return value > 0 ? 'Yes' : 'No';
  }
}
