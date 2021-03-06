import { Injectable } from '@angular/core';
import { PlanteUtilisateurCreateDto } from '../models/plante-utilisateur-create-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/response-dto';
import { PlanteUtilisateurUpdateDto } from '../models/plante-utilisateur-update-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanteUtilisateurService {

  planteUtilisateur: PlanteUtilisateurUpdateDto;

  private URL = environment.baseUrl + 'planteUtilisateur';

  constructor(private http: HttpClient) { }

  create(planteUtilisateur: PlanteUtilisateurCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, planteUtilisateur);
  }

  update(planteUtilisateur: PlanteUtilisateurUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, planteUtilisateur);
  }

  getId(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + id);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }


  // findByJardin
  getAllByJardin(idJardin: number, nbpage: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/jardin/' + idJardin + "?page=" + nbpage);
  }

  // findByJardin
  getAllByJardinListe(idJardin: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/jardin/liste/' + idJardin);
  }

  deleteByJardin(idJardin: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/jardin/' + idJardin);
  }

  

  

}
