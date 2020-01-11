import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-dialog',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.sass']
})
export class AddUpdateDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private toastr: ToastrService,

  ) { }

  getForm() {
    this.form = this.formBuilder.group(
      {
        id: this.data.selectedTournament.id,
        name: [this.data.selectedTournament.name, [
          Validators.maxLength(30),
        ]],
        description: [this.data.selectedTournament.description,[
        Validators.maxLength(100),
        ]],
        preparationTerm: [this.data.selectedTournament.preparationTerm, [
          Validators.max(30),
        ]],
      });
  }

  ngOnInit() {
    this.getForm();
  }

  submit(form): void {
    this.dialogRef.close(form.value);
  }


}
