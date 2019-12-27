import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
declare  var  require: any;
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Input() searchModel;
  form: FormGroup;

  imgSearch = require('../../../../shared/images/search.png');
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText = '';
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
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
    console.log(filters);
  }




}
