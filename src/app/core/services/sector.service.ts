import { Injectable } from '@angular/core';
import { Sector } from '../../shared/models/sector-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private apiURL = environment.urlAddress + '/sectors';
  constructor(private http: HttpClient) {}

  getSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.apiURL)
      .pipe(
        map((data: Sector[]) =>
          data.map(
            (item: any) =>
              new Sector(item.id, item.number, item.description, item.gpsLat, item.gpsLng, item.isActive)
          )
        )
      );
  }

  getSectorIdBySectorNumber(sectorNumber: number){
    return this.http.get<number>(`${this.apiURL}/byNumber/${sectorNumber}`);
  }
}
