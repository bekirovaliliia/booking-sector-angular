import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.sass']
})
export class GlobalSearchComponent implements OnInit {
  @Input() searchText;
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  updateSearchText(text: string): void {
       this.searchText = text;
       this.searchTextChange.emit(this.searchText);
  }
}
