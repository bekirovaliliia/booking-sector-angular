import { Pipe, PipeTransform } from '@angular/core';
import {Booking} from '../../shared/models/booking.model';

@Pipe({
  name: 'isApproved',
})
export class IsApprovedPipe implements PipeTransform {

  transform(allBookings: Booking[]): Booking[] {
    return allBookings.filter(b => b.isApproved);
  }

}
