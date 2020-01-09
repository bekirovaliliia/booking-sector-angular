import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
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
        name: this.data.selectedTournament.name,
        description: this.data.selectedTournament.description,
        preparationTerm: this.data.selectedTournament.preparationTerm,
      });
  }

  ngOnInit() {
    this.getForm();

  }

  submit(form): void {
    if (form.value.name === '' ) {
      this.toastr.error('Enter name of tournament', 'Try again!');
      return;
    }

    if (form.value.preparationTerm === null ) {
      this.toastr.error('Enter preparation term of tournament', 'Try again!');
      return;
    }

    this.dialogRef.close(form.value);
  }


}
