import { Injectable } from '@angular/core';
import { Sector } from '../../shared/models/sector-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SectorService {
  constructor(private http: HttpClient) {}
  public urlAddress: string = environment.urlAddress;

  getSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.urlAddress}sectors`)
      .pipe(
        map((data: Sector[]) =>
          data.map(
            (item: any) =>
              new Sector(item.id, item.number, item.description, item.gpsLat, item.gpsLng, item.isActive)
          )
        )
      );
  }

  getById(id: number): Observable<Sector> {
    return this.http.get<Sector>(`${this.urlAddress}sectors/${id}`)
      .pipe(
        map((item: Sector) =>
            new Sector(item.id, item.number, item.description, item.gpsLat, item.gpsLng, item.isActive)
        )
      );
  }

  add(sector: Sector): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(`${this.urlAddress}sectors`, sector, httpOptions);
  }

  update(sector: Sector): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlAddress}sectors/${sector.id}`, sector, httpOptions);
  }

  delete(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`${this.urlAddress}sectors/${id}`);
  }
}
