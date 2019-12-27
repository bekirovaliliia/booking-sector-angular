import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.sass']
})
export class UpdateDialogComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  isUpdated: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  getForm() {
    this.form = this.formBuilder.group(
      {
        id: this.data ? this.data.id : '',
        name: this.data ? this.data.name : '',
        description: this.data ? this.data.description : '',
        preparationTerm: this.data ? this.data.preparationTerm : '',

  });

  }
  ngOnInit() {
    this.getForm();
    this.dialogTitle = this.data.title;
    this.isUpdated = this.data.isUpdated;
  }
  submit(form): void {
    console.log(form.value);
    this.dialogRef.close(form.value);
  }


}
