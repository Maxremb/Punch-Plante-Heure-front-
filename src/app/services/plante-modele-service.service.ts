import { Injectable } from '@angular/core';
import { PlanteModeleCreateDto } from '../models/plante-modele-create-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PlanteModeleResponseDto } from '../models/plante-modele-response-dto';
import { PlanteModeleUpdateDto } from '../models/plante-modele-update-dto';

@Injectable({
  providedIn: 'root'
})
export class PlanteModeleService {

  planteModele: PlanteModeleCreateDto

  private URL = environment.baseUrl + 'planteModele';

  constructor(private http: HttpClient) { }

  create(planteModele: PlanteModeleCreateDto): Observable<PlanteModeleResponseDto> {
    return this.http.post<PlanteModeleResponseDto>(this.URL, planteModele);
  }

  getAll(): Observable<PlanteModeleResponseDto> {
    return this.http.get<PlanteModeleResponseDto>(this.URL + '/all');
  }

  getId(id: number): Observable<PlanteModeleResponseDto> {
    return this.http.get<PlanteModeleResponseDto>(this.URL + '/' + id);
  }

  update(planteModele: PlanteModeleUpdateDto): Observable<PlanteModeleResponseDto> {
    return this.http.put<PlanteModeleResponseDto>(this.URL, + planteModele);
  }

  delete(id: number): Observable<PlanteModeleResponseDto> {
    return this.http.delete<PlanteModeleResponseDto>(this.URL + '/' + id);
  }

}
