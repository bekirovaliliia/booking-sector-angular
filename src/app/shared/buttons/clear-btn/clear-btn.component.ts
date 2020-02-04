import { Component, EventEmitter, OnInit, Output } from '@angular/core';
declare  var  require: any;

@Component({
  selector: 'app-clear-btn',
  templateUrl: './clear-btn.component.html',
  styleUrls: ['./clear-btn.component.sass']
})
export class ClearBtnComponent implements OnInit {

  imgClear = require('../../images/clear.png');
  @Output() selectedToClear: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  select() {
    this.selectedToClear.emit();
  }
}
