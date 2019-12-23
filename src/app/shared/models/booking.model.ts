export class  Booking {
  id: number;
  bookingStart: Date;
  bookingEnd: Date;
  isApproved: boolean;
  sectorId: number;
  userId: number;
  createUserId?: number;
}
