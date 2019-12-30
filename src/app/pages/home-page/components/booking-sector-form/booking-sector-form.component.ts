import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'app-booking-sector-form',
  templateUrl: './booking-sector-form.component.html',
  styleUrls: ['./booking-sector-form.component.css']
})
export class BookingSectorFormComponent implements OnInit {

  bookingSectorForm: FormGroup;
  sectorNumber: any;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService) { }

    clearSelectedSectors(){
      this.sectorNumber = null;
    }

    ngOnInit() {
      this.bookingSectorForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      });
      this.dataService.currentSectorNumber.subscribe(number=>this.sectorNumber = number);
    }
}
