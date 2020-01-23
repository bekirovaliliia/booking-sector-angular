import { delay } from 'rxjs/operators';
import { sleep } from 'sleep-ts';
import { Booking } from './../../../shared/models/booking.model';
import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView
} from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { BookingService } from 'src/app/core/services/booking.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  booking: Booking[];
  

  constructor(
    private modal: NgbModal,
    private httpService: HttpClient,
    private bookingService: BookingService) {}

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 2),
      title: 'Sector 1',
      color: colors.blue,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
    },
    {
      start: subDays(startOfDay(new Date()), 2),
      end: addDays(new Date(), 2),
      title: 'Sector 2',
      color: colors.red,
    },
    {
      start: subDays(endOfMonth(new Date()), 1),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Sector 3',
      color: colors.yellow,
      allDay: true
    },
  ];

  ngOnInit(){
    this.getBookings();
  }

  getBookings(){
    this.bookingService.getAllBookings().then(res => {
      this.booking = res;
    });
  }

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(this.booking);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
}