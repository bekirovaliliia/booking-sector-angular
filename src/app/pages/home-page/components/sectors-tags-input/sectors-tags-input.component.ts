import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pull } from 'lodash';
import { BookingSectorsDataService } from '../../../../core/services/booking-sectors-data.service';
import { Sector } from 'src/app/shared/models/sector-model';

@Component({
  selector: 'app-sectors-tags-input',
  templateUrl: './sectors-tags-input.component.html',
  styleUrls: ['./sectors-tags-input.component.scss']
})
export class SectorsTagsInputComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dataService: BookingSectorsDataService
  ) { }

  tags: Sector[];
  form: FormGroup;
  maxBookingSectors: number;

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);  
    } else {
      this.tags.splice(-1);
    }
    console.log(this.dataService.selectedSectors);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tag: [undefined],
    });
    this.tags = this.dataService.selectedSectors;
  }
}
