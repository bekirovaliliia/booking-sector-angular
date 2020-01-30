import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public user: User;
  constructor() { }
}
