import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-update-sector-dialog',
  templateUrl: './add-update-sector-dialog.component.html',
  styleUrls: ['./add-update-sector-dialog.component.sass']
})

export class AddUpdateSectorDialogComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUpdateSectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.getForm();
  }

  getForm() {
    this.form = this.formBuilder.group(
    {
      id: this.data.selectedSector.id,
      number: [this.data.selectedSector.number, [
        Validators.min(1)
      ]],
      description: [this.data.selectedSector.description,[
        Validators.maxLength(512)
      ]],
      gpsLat: [this.data.selectedSector.gpsLat, [
        Validators.max(90),
        Validators.min(-90)
      ]],
      gpsLng: [this.data.selectedSector.gpsLng, [
        Validators.max(180),
        Validators.min(-180)
      ]],
      isActive: [this.setIsActive()]
    });
  }

  setIsActive(){
    if((this.data.selectedSector.isActive === false) || (this.data.selectedSector.isActive === true)) {
      return 'true';
    } else {
      return 'null';
    }
  }

  submit(form): void {
    this.dialogRef.close(form.value);
  }
}
