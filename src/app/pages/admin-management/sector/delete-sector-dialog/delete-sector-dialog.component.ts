import { MatDialogRef } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-sector-dialog',
  templateUrl: './delete-sector-dialog.component.html',
  styleUrls: ['./delete-sector-dialog.component.sass']
})
export class DeleteSectorDialogComponent implements OnInit {
  @Input() deleteHeader: string;
  constructor(private dialogRef: MatDialogRef<DeleteSectorDialogComponent>) { }

  ngOnInit() {
  }
  submit() {
    this.dialogRef.close(true);
  }
}
