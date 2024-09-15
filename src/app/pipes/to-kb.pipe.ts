import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toKb',
  standalone: true
})
export class ToKbPipe implements PipeTransform {

  transform(value: any, arg: string): string {
    if (arg==="kb") {
      if (value<1000000) {
        return Math.floor(value/(1024))+","+Math.floor((value%1024000)/1000 ) + " KB"
      }
      if (value<999999999) {
        return Math.floor(value/(1024000))+","+Math.floor((value%1024000)/10000 )+ " MB"
      }
      return value
        
    }
    else return value + " KB"
  }

}
