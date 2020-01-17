import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-update-sector-dialog',
  templateUrl: './add-update-sector-dialog.component.html',
  styleUrls: ['./add-update-sector-dialog.component.sass']
})
export class AddUpdateSectorDialogComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUpdateSectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getForm();
  }

  getForm() {
    this.form = this.formBuilder.group(
      {
        id: this.data.selectedSector.id,
        number: [this.data.selectedSector.number, [
          Validators.maxLength(3),
        ]],
        description: [this.data.selectedSector.description,[
        Validators.maxLength(100),
        ]],
        gpsLat: [this.data.selectedSector.gpsLat],
        gpsLng: [this.data.selectedSector.gpsLng],
        isActive: [this.data.selectedSector.isActive],
      });
  }

  submit(form): void {
    console.log(form.value);
    this.dialogRef.close(form.value);
  }
}
