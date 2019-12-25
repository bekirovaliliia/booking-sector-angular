import {ChangeDetectorRef, Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Tournament} from '../../../../shared/models/tournament';
import {TournamentService} from '../../../../core/services/tournament.service';
import {Subject} from 'rxjs';
import {Booking} from '../../../../shared/models/booking.model';
import {BookingService} from '../../../../core/services/booking.service';


@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.sass']
})
export class TournamentTableComponent implements OnInit, OnDestroy {

  @Input() searchModel: string;
  @Input() tournaments: Tournament[];
  @Input() tour: Tournament;
  bookedTournaments: Booking[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  tourHeaders: string[];
  bookHeaders: string[];
  constructor( private tournamentService: TournamentService,
               private bookingService: BookingService,
               private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      responsive: true
    };

    this.getTournaments();
    this.getBookings();
  }

  getTournaments() {
    this.tournamentService.getTournaments().subscribe(res => {
      this.tournaments = res;
      console.log(this.tournaments);
      this.tourHeaders = (this.tournaments && this.tournaments.length > 0) ? Object.keys(this.tournaments[0]) : [];
      console.log(this.tourHeaders);
    });
  }
  getBookings(){
    this.bookingService.getBookedTournaments().subscribe(res => {
      this.bookedTournaments = res;
      console.log(this.bookedTournaments);
      this.bookHeaders = (this.bookedTournaments && this.bookedTournaments.length > 0) ? Object.keys(this.bookedTournaments[0]) : [];
      console.log(this.bookHeaders);
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
