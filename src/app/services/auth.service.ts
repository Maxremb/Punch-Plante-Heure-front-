import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.baseUrl + 'session';

  constructor(private http: HttpClient) { }

  public getRole(token: string): Observable<Role>{
    return this.http.post<Role>(this.URL + '/role', token);
  }

}
