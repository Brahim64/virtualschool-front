import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kbToMb',
  standalone: true
})
export class KbToMbPipe implements PipeTransform {

  transform(value: any, arg: string): unknown {
    if (arg==="mb") {
      if (value>1023) {
        return Math.floor(value/(1024*8)) + " MB"
      }
      else return value + " KB"
    }
    else return value + " KB"
  }

}
