import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tournament-checkbox',
  templateUrl: './tournament-checkbox.component.html',
  styleUrls: ['./tournament-checkbox.component.sass']
})
export class TournamentCheckboxComponent implements OnInit {
 @Output()  selectedCheckbox: EventEmitter<boolean> = new EventEmitter<boolean>();
  selected: any;
  constructor() { }

  ngOnInit() {
    this.selectedCheckbox.emit(false);
  }

  onChange(selected) {
    this.selectedCheckbox.emit(selected);
  }
}