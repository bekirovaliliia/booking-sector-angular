import { Component, EventEmitter, OnInit, Output } from '@angular/core';
declare  var  require: any;
@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.sass']
})
export class DeleteBtnComponent implements OnInit {
  imgDelete = require('../../images/cancel.png');

  @Output() selectedToDelete: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  select() {
    this.selectedToDelete.emit();
  }
}
