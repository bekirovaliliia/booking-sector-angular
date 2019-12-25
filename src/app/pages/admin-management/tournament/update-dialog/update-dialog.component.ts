import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.sass']
})
export class UpdateDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  getForm() {
    this.form = this.formBuilder.group(
      {
        tourId: this.data ? this.data.tourId : '',
        bookStart: this.data ? this.data.bookStart : '',
        bookEnd: this.data ? this.data.bookEnd : '',
        sectorId: this.data ? this.data.sectorId : '',
      });

  }
  ngOnInit() {
    this.getForm();
    console.log(this.data);
  }
  submit(form): void {
    this.dialogRef.close(`${form.value}`);
  }
}
