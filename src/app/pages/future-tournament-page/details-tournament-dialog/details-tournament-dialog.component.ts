import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';
import {Tournament} from '../../../shared/models/tournament';

@Component({
  selector: 'app-details-tournament-dialog',
  templateUrl: './details-tournament-dialog.component.html',
  styleUrls: ['./details-tournament-dialog.component.sass']
})
export class DetailsTournamentDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DetailsTournamentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
  ) {

  }

  getForm() {
    this.form = this.formBuilder.group(
      {
        id: this.data.selectedTournament.id,
        name: this.data.selectedTournament.name,
        description: this.data.selectedTournament.description,
        start: this.data.selectedTournament.tournamentStart,
        end: this.data.selectedTournament.tournamentEnd,
      });
  }

  ngOnInit() {
    this.getForm();
  }

}

