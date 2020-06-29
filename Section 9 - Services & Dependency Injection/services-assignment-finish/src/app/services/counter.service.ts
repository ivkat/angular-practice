import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

// @Injectable()
export class CounterService {
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;
  constructor() { }

  incrementActiveToInactiveCounter(){
    this.activeToInactiveCounter++;
    console.log(this.activeToInactiveCounter);
  }

  incrementInactiveToActiveCounter(){
    this.inactiveToActiveCounter++;
    console.log(this.inactiveToActiveCounter);
  }
}
