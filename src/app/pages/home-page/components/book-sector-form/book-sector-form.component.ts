import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-sector-form',
  templateUrl: './book-sector-form.component.html',
  styleUrls: ['./book-sector-form.component.css']
})
export class BookSectorFormComponent implements OnInit {

  bookingSectorForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bookingSectorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
  });
  }

}
