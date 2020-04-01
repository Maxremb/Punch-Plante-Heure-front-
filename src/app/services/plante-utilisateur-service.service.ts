import { Injectable } from '@angular/core';
import { PlanteUtilisateurCreateDto } from '../models/plante-utilisateur-create-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PlanteUtilisateurResponseDto } from '../models/plante-utilisateur-response-dto';

@Injectable({
  providedIn: 'root'
})
export class PlanteUtilisateurServiceService {

  planteUtilisateur: PlanteUtilisateurCreateDto;

  private URL = environment.baseUrl + 'planteUtilisateur';

  constructor(private http: HttpClient) { }

  create(planteUtilisateur: PlanteUtilisateurCreateDto): Observable<PlanteUtilisateurResponseDto> {
    return this.http.post<PlanteUtilisateurResponseDto>(this.URL, planteUtilisateur);
  }

  getAll(): Observable<PlanteUtilisateurResponseDto> {
    return this.http.get<PlanteUtilisateurResponseDto>(this.URL + '/all');
  }

  getId(id: number): Observable<PlanteUtilisateurResponseDto> {
    return this.http.get<PlanteUtilisateurResponseDto>(this.URL + '/' + id);
  }

  update(planteUtilisateur: PlanteUtilisateurCreateDto): Observable<PlanteUtilisateurResponseDto> {
    return this.http.put<PlanteUtilisateurResponseDto>(this.URL, + planteUtilisateur);
  }

  delete(id: number): Observable<PlanteUtilisateurResponseDto> {
    return this.http.delete<PlanteUtilisateurResponseDto>(this.URL + '/' + id);
  }

}
