export class  Booking {
  id: number;

  tournamentId: number;
  bookingStart: string;
  bookingEnd: string;
  sectorId: number;
  userId: number;
  isApproved?: boolean;

    constructor(id: number, tournamentId: number, bookingStart: string, bookingEnd: string, sectorId: number, userId: number) {
    this.id = id;

    this.tournamentId = tournamentId;
    this.bookingEnd = bookingEnd;
    this.bookingStart = bookingStart;

    this.sectorId = sectorId;
    this.userId = userId;

  }
}
