import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UsersService],
})
export class AppComponent implements OnInit{
  
   
  activeUsers: string[] = [];
  inactiveUsers: string[] = [];

  constructor(private userService: UsersService){}
  ngOnInit(){
    this.activeUsers = this.userService.activeUsers;
    this.inactiveUsers = this.userService.inactiveUsers;
  }

  onSetToInactive(id: number) {
    this.userService.setToInactive(id);    
  }

  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }
}
