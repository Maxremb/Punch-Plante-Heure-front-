import { Injectable } from '@angular/core';
import { PlanteModeleCreateDto } from '../models/plante-modele-create-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PlanteModeleUpdateDto } from '../models/plante-modele-update-dto';
import { ResponseDto } from '../models/response-dto';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlanteModeleService {

  planteModele: PlanteModeleCreateDto;

  private URL = environment.baseUrl + 'planteModele';

  constructor(private http: HttpClient) { }

  create(planteModele: PlanteModeleCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, planteModele);
  }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  getId(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + id);
  }

  update(planteModele: PlanteModeleUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, + planteModele);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }

}
