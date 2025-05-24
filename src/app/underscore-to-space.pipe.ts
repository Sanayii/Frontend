import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscoreToSpace'
})
export class UnderscoreToSpacePipe implements PipeTransform {

  transform(value: string|undefined): string|undefined {
    return value?.replace(/_/g, ' ');
  }

}
