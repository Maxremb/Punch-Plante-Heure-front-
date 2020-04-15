import { Injectable } from '@angular/core';
import { AdminUpdateDto } from '../models/admin-update-dto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../models/response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

admin: AdminUpdateDto;

private URL = environment.baseUrl + 'admin';


  constructor(private http: HttpClient) { }

  update(admin: AdminUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, admin);
  }

  getAdmin(identifier: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + identifier);
  }


}
