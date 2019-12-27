export class Sector {
    id: number;
    number: number;
    description: string;
    gpsLat: number;
    gpsLng: number;
    isActive: boolean;

    constructor(id?: number, number?: number, description?: string, gpsLat?: number, gpsLng?: number, isActive?: boolean) {
        this.id = id;
        this.number = number;
        this.description = description;
        this.gpsLat = gpsLat;
        this.gpsLng = gpsLng;
        this.isActive = isActive;
      }
}