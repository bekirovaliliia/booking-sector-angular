import { Injectable } from '@angular/core';
import {Tournament} from '../../shared/models/tournament';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import {filter, map} from 'rxjs/operators';
import {Booking} from '../../shared/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private http: HttpClient) {}
  public urlAddress: string = environment.urlAddress;

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${this.urlAddress}tournaments/all`)
      .pipe(
        map((data: Tournament[]) =>
          data.map(
            (item: any) =>
              new Tournament(item.id, item.name, item.description, item.preparationTerm)
          )

        )
      );
  }


  getTournamentById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${this.urlAddress}tournaments/${id}`)
      .pipe(
        map((item: Tournament) =>
            new Tournament(item.id, item.name, item.description, item.preparationTerm)
        )
      );
  }

  deleteTournament(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete(`${this.urlAddress}tournaments/${id}`);
  }

  updateTournament(tournament: Tournament): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log(tournament);
    return this.http.put(`${this.urlAddress}tournaments/${tournament.id}`, tournament, httpOptions);
  }

  addTournament(tournament: Tournament): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log(tournament);
    return this.http.post(`${this.urlAddress}tournaments`, tournament, httpOptions);
  }

}
