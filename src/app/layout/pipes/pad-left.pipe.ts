import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padLeft'
})
export class PadLeftPipe implements PipeTransform {

  transform(value: any=0,char:string,charNumber:number): any {
    var str = "" + value;
var pad = char.repeat(charNumber);
var ans = pad.substring(0, pad.length - str.length) + str;
return ans;
  }

}
