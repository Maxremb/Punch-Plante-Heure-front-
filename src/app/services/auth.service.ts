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

  public getRole(token: string): Observable<Role>{
    return this.http.post<Role>(this.URL + '/role', token);
  }

  public getId(token: string): Observable<number>{
    return this.http.post<number>(this.URL + '/identifier', token);
  }

  public getConnectedUser(token: string): Observable<ConnectedUser>{
    return this.http.post<ConnectedUser>(this.URL + '/user', token);
  }

}
