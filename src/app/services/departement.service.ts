import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DepartementDto } from '../models/departement-dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {


  departement: DepartementDto;

  private URL = environment.baseUrl + 'departement';

  constructor(private http: HttpClient) { }

  create(departement: DepartementDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, departement);
  }

  update(departement: DepartementDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, departement);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }

  getByName(name: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + name);
  }

  getAllAdmin(nbpage: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all/' + nbpage);
  }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  // readMeteoByNumDep
  getMeteoByDepartement(numDepartement: number, numelem: number, page: number, sortname: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/meteo?elemsPerPage=' + numelem + '&id=' + numDepartement + '&page=' + page + '&sortName=' + sortname);
  }



  // readById
  getById(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/one/' + id);
  }

}

