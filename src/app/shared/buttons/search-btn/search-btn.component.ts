import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare  var  require: any;

@Component({
  selector: 'app-search-btn',
  templateUrl: './search-btn.component.html',
  styleUrls: ['./search-btn.component.sass']
})
export class SearchBtnComponent implements OnInit {

  imgSearch = require('../../images/search.png');
  @Output() selectedToSearch: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchBtnText: string;
  constructor() { }

  ngOnInit() {
  }
  select() {
    this.selectedToSearch.emit();
  }
}
