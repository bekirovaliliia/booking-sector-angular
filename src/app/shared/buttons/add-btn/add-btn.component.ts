import {Component, EventEmitter, OnInit, Output} from '@angular/core';
declare  var  require: any;
@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.sass']
})
export class AddBtnComponent implements OnInit {
  imgAdd = require('../../images/add.png');

  @Output() selectedToAdd: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  select() {
    this.selectedToAdd.emit();
  }
}
