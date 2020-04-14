import { Injectable } from '@angular/core';
import { JardinCreateDto } from '../models/jardin-create-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JardinUpdateDto } from '../models/jardin-update-dto';
import { ResponseDto } from '../models/response-dto';


@Injectable({
  providedIn: 'root'
})
export class JardinService {

  jardin: JardinUpdateDto;

  private URL = environment.baseUrl + 'jardin';

  constructor(private http: HttpClient) { }

  create(jardin: JardinCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, jardin);
  }

  update(jardin: JardinUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, jardin);
  }

  getId(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + id);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }

  getAll(page: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all/' + page);
  }

  // readByDep
  getAllByDepartement(numDepartement: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/departement/' + numDepartement);
  }

  // readByName
  getAllByName(name: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/name/' + name);
  }

  // readByUser
  getAllByUtilisateur(idUtilisateur: number, page: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/user?identifier='+ idUtilisateur + '&page=' + page);
  }

  setArrosed(idJardin : number){
    return this.http.get<ResponseDto>(this.URL + '/arrosage?id='+ idJardin);
  }

 




}
