import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DepartementUpdateDto } from '../models/departement-update-dto';
import { HttpClient } from '@angular/common/http';
import { DepartementCreateDto } from '../models/departement-create-dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  departement: DepartementUpdateDto;

  private URL = environment.baseUrl + 'departement';

  constructor(private http: HttpClient) { }

  create(departement: DepartementCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, departement);
  }

  update(departement: DepartementUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, departement);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }

  getByName(name: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + name);
  }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  // readMeteoByNumDep
  getMeteoByDepartement(numDepartement: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/meteo/' + numDepartement);
  }

  // readById
  getById(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/one/' + id);
  }

}
 
