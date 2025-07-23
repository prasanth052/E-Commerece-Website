import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase'
})
export class SplitCamelCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2')        // batteryCapacity → battery Capacity
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')  // CPUType → CPU Type
      .replace(/_/g, ' ')                         // handle snake_case
      .trim();
  }
}
