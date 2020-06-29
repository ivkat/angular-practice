import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers: number[] = [];
  title = 'practice-project';

  onIncremented(eventData: { number: number }) {
    this.numbers.push(eventData.number);
    console.log('This is number ' + eventData.number.toString());
  }

  onStopped(stopData: { handler }) {
    if (stopData.handler) {
      clearInterval(stopData.handler);
      stopData.handler = null;
      alert('Game stopped');

    }
    else {
      alert('Game not started');
    }
  }

  getEvenNumbers() {
    return this.numbers.filter((num) => num%2 == 0);
  }

  getOddNumbers() {
    return this.numbers.filter((num) => num % 2 != 0);
  }
}
