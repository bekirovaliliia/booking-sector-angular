import { Component, EventEmitter, OnInit, Output } from '@angular/core';
declare  var  require: any;
@Component({
  selector: 'app-details-btn',
  templateUrl: './details-btn.component.html',
  styleUrls: ['./details-btn.component.sass']
})
export class DetailsBtnComponent implements OnInit {
  imgDetails = require('../../images/details.png');
  @Output() selectedToExpand: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  select() {
    this.selectedToExpand.emit();
  }
}
