import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: any=0, args?: any): any {
//6,77
    if(value==null) value=0;
    let money=(parseFloat(value.toString().replace(',','.')).toFixed(2)).toString().replace('.',',');
    return money;
  }

}
