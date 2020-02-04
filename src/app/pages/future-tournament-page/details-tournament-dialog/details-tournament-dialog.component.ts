import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-tournament-dialog',
  templateUrl: './details-tournament-dialog.component.html',
  styleUrls: ['./details-tournament-dialog.component.sass']
})
export class DetailsTournamentDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  }

  ngOnInit() {
  }
}

