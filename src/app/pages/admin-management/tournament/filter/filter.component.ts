import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
declare  var  require: any;
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Input() searchModel;

  imgname = require('../../../../shared/images/search.png');
  @Output() searchModelChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateSearchModel(value) {
    this.searchModel = value;
    this.searchModelChange.emit(this.searchModel);
  }
}
