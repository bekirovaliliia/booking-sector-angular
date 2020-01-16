import { Injectable } from '@angular/core';
import {Tournament} from '../../shared/models/tournament';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private http: HttpClient) {}
  public urlAddress: string = environment.urlAddress;

  getAll(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.urlAddress}tournaments/all`)
      .pipe(
        map((data: Tournament[]) =>
          data.map(
            (item: any) =>
              new Tournament(item.id, item.name, item.description, item.preparationTerm, item.isBooked)
          )
        )
      );
  }


  getById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.urlAddress}tournaments/${id}`)
      .pipe(
        map((item: Tournament) =>
            new Tournament(item.id, item.name, item.description, item.preparationTerm, item.isBooked)
        )
      );
  }

  delete(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`${this.urlAddress}tournaments/${id}`);
  }

  update(tournament: Tournament): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${this.urlAddress}tournaments/${tournament.id}`, tournament, httpOptions);
  }

  add(tournament: Tournament): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(`${this.urlAddress}tournaments`, tournament, httpOptions);
  }

}
