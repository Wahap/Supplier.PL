import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: any=0, args?: any): any {
    let money=value.toFixed(2).toString().replace('.',',')
    return money;
  }

}
