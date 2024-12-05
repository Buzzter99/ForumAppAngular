import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'formatDateTime',
  standalone: true
})
export class FormatDateTimePipe implements PipeTransform {
  transform(value: Date): string {
    if (!value) {
      return '';
    }
    const datePart = value.toString().slice(0, 10).split('-').reverse().join('-');
    const timePart = value.toString().slice(11, 16);
    return `${datePart} ${timePart}`;
  }
}
