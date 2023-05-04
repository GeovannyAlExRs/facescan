import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value) return null
    if(!args) return value

    args = args.toLowerCase()
    console.log('VALUE: ', value, ' ARGS: ', args);


    return value.filter((user: any) => {
      return JSON.stringify(user.nameImg).toLowerCase().includes(args)
    })
  }

}
