import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-book-sector-form',
  templateUrl: './book-sector-form.component.html',
  styleUrls: ['./book-sector-form.component.css']
})
export class BookSectorFormComponent implements OnInit {

  bookingSectorForm: FormGroup;
  sectorNumber: any;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit() {
    this.bookingSectorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.dataService.currentSectorNumber.subscribe(number=>this.sectorNumber = number);
  }
}
