import { Booking } from './../../../shared/models/booking.model';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
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