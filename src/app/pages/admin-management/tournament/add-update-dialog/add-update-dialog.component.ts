import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import {Tournament} from '../../../../shared/models/tournament';

@Component({
    selector: 'app-update-dialog',
    templateUrl: './add-update-dialog.component.html',
    styleUrls: ['./add-update-dialog.component.sass']
})
export class AddUpdateDialogComponent implements OnInit {
    form: FormGroup;
    maxDate: moment.Moment;
    minDate: moment.Moment;
    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AddUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data,
        private toastr: ToastrService,
    ) {

    }

    getForm() {
        this.form = this.formBuilder.group(
            {
                id: this.data.selectedTournament.id,

                name: [this.data.selectedTournament.name, [
                    Validators.maxLength(30),
                ]],

                description: [this.data.selectedTournament.description, [
                    Validators.maxLength(512),
                ]],
                selected: {
                    startDate: moment(this.data.selectedTournament.tournamentStart),
                    endDate: moment(this.data.selectedTournament.tournamentEnd)
                },
                preparationTerm: [this.data.selectedTournament.preparationTerm, [
                    Validators.max(30),
                ]],
            });
        console.log(this.form.value.selected.startDate);
    }

    ngOnInit() {
        this.getForm();
        this.maxDate = moment().add(6,  'months');

        if (this.form.value.selected.startDate === undefined) {
            this.minDate = moment();
        } else {
            this.minDate = (moment() < this.form.value.selected.startDate) ? moment() : this.form.value.selected.startDate;
        }
    }

    submit(form): void {
        const tournament = new Tournament(this.data.selectedTournament.id, this.form.value.name, this.form.value.description, this.form.value.preparationTerm, this.form.value.selected.startDate.format('YYYY-MM-DDTHH:mm:ss'), this.form.value.selected.endDate.format('YYYY-MM-DDTHH:mm:ss') );
        this.dialogRef.close(tournament);
    }

}
