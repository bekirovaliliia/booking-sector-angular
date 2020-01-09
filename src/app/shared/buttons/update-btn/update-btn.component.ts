import {Component, EventEmitter, OnInit, Output} from '@angular/core';
declare  var  require: any;
@Component({
  selector: 'app-update-btn',
  templateUrl: './update-btn.component.html',
  styleUrls: ['./update-btn.component.sass']
})
export class UpdateBtnComponent implements OnInit {
  imgEdit = require('../../images/edit.png');
  @Output() selectedToUpdate: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  select() {
    this.selectedToUpdate.emit();
  }
}
