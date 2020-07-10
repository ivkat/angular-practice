import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByName'
})
export class SortByNamePipe implements PipeTransform {

  transform(servers: {instanceType: string, name: string, status: string, started: Date}[])
          : {
              instanceType: string,
              name: string,
              status: string,
              started: Date
          }[] {
    return servers.sort((a, b) => a.name.localeCompare( b.name));
  }

}
