import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.sass']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) {  }

  ngOnInit() {
  }

  submit(): void {
    this.dialogRef.close(true);
  }
}
