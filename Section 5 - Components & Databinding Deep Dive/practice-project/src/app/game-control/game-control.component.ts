import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output('incremented') incremented = new EventEmitter<{ number: number }>();
  @Output('stopped') stopped = new EventEmitter<{ handler: any }>();
  counter: number = 0;
  intervalHandler;
  

  constructor() { }

  ngOnInit(): void {
  }

  onGameStarted() {
    
    this.intervalHandler = setInterval(
      () => {

        this.incremented.emit({ number: this.counter });
        this.counter++;
      }, 1000
    );
  }

  onGameStopped() {
    this.stopped.emit({handler: this.intervalHandler });
  }
}
