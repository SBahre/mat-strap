import { Pipe, PipeTransform } from '@angular/core';
import { IValueProperties } from '../resources/value-properties';

@Pipe({
  name: 'numberChecker',
})
export class NumberCheckerPipe implements PipeTransform {
  transform(value: string | number): IValueProperties {
    if (typeof value === 'number')
      return <IValueProperties>{ isRightAligned: true, value: `$ ${value}` };
    if (typeof value === 'string') {
      if (!Number.isNaN(parseInt(value))) {
        return <IValueProperties>{ isRightAligned: true, value: `$ ${value}` };
      } else {
        return <IValueProperties>{ isRightAligned: false, value: `${value}` };
      }
    }
    return value;
  }
}
