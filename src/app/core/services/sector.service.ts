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
<<<<<<< HEAD
=======

  private apiURL = 'https://localhost:44393/api/sectors';
>>>>>>> d7ee2b51bedac7b31dab066d1b60044e3ec96347
  constructor(private http: HttpClient) {}
  public urlAddress: string = environment.urlAddress;

  getSectors(): Observable<Sector[]> {
<<<<<<< HEAD
    return this.http.get<Sector[]>(`${this.urlAddress}sectors`)
=======
    return this.http.get<Sector[]>(this.apiURL)
>>>>>>> d7ee2b51bedac7b31dab066d1b60044e3ec96347
      .pipe(
        map((data: Sector[]) =>
          data.map(
            (item: any) =>
              new Sector(item.id, item.number, item.description, item.gpsLat, item.gpsLng, item.isActive)
          )
        )
      );
  }

<<<<<<< HEAD
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
    return this.http.delete(`${this.urlAddress}sectors/${id}`);
=======
  getSectorIdBySectorNumber(sectorNumber: number){
    return this.http.get<number>(`${this.apiURL}/byNumber/${sectorNumber}`);
>>>>>>> d7ee2b51bedac7b31dab066d1b60044e3ec96347
  }
}
