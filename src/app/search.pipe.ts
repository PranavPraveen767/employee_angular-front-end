import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  /* first argument should be the item which have to be transformed
  seconmd argument is based on which the transformation is done */

  transform(employeedetails:any[],searchKey:string):any[]  {
    const result:any=[]
    if(!employeedetails || searchKey===""){
      return employeedetails
    }
    employeedetails.forEach((item:any)=>{
      /* includes returns boolean value */
      if(item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
