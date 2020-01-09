import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.sass']
})
export class DeleteDialogComponent implements OnInit {
@Input() deleteHeader: string;
  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
  }
  submit() {
    this.dialogRef.close(true);
  }
}
