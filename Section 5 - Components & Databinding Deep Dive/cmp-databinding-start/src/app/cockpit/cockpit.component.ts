import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output('svCreated') serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ blueprintName: string, blueprintContent: string }>();
  //newServerName = '';
  //newServerContent = '';
  @ViewChild('serverContentInput', { static: true }) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }


  onAddServer(nameInput: HTMLInputElement) {


    this.serverCreated.emit({
      //serverName: this.newServerName,
      serverName: nameInput.value,
      //serverContent: this.newServerContent
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {    
    this.blueprintCreated.emit({
      //blueprintName: this.newServerName,
      blueprintName: nameInput.value,
      //blueprintContent: this.newServerContent
      blueprintContent: this.serverContentInput.nativeElement.value
    });
  }
}