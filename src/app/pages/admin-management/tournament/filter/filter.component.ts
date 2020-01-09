import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {
  form: FormGroup;
  searchText = '';
  @Input() searchModel;
  @Input() searchBtn = 'Search';

  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: new FormControl(''),
      preparationTerm: new FormControl(''),

    });
  }

  search(filters: any): void {
    Object.keys(filters).forEach(key => (filters[key] === ' ' || filters[key] === null) ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }
}
