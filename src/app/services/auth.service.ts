import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { ConnectedUser } from '../models/connectedUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.baseUrl + 'session';

  constructor(private http: HttpClient) { }

  public getRole(): Observable<Role>{
    return this.http.get<Role>(this.URL + '/role');
  }

  public getId(): Observable<number>{
    return this.http.get<number>(this.URL + '/identifier');
  }

  public getConnectedUser(): Observable<ConnectedUser>{
    return this.http.get<ConnectedUser>(this.URL + '/user');
  }

  public getUserGardens(): Observable<Array<number>>{
    return this.http.get<Array<number>>(this.URL + '/gardens');
  }

  public getUserPlants(): Observable<Array<number>>{
    return this.http.get<Array<number>>(this.URL + '/plants');
  }

}
