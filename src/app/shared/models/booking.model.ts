export class Booking {
  id: number;
  tournamentId: number;
  bookingStart: string;
  bookingEnd: string;
  sectorId: number;
  userId: number;
  isApproved?: boolean;

  // tslint:disable-next-line:max-line-length
    constructor(id: number, tournamentId: number, bookingStart: string, bookingEnd: string, sectorId: number, userId: number, isApproved?: boolean) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.bookingStart = bookingStart;
    this.bookingEnd = bookingEnd;
    this.sectorId = sectorId;
    this.userId = userId;
    this.isApproved = isApproved;
  }
}
