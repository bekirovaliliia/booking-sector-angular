import { Injectable } from '@angular/core';
import { Sector } from '../../shared/models/sector-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) {}

  getSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>('https://localhost:44393/api/sectors')
      .pipe(
        map((data: Sector[]) =>
          data.map(
            (item: any) =>
              new Sector(item.id, item.number, item.description, item.gpsLat, item.gpsLng, item.isActive)
          )
        )
      );
  }
}
