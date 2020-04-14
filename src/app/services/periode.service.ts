import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PeriodeCreateDto } from '../models/periode-create-dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/response-dto';
import { PeriodeUpdateDto } from '../models/periode-update-dto';
import { PeriodeEnum } from '../enums/periode-enum.enum';
import { PlanteModeleUpdateDto } from '../models/plante-modele-update-dto';
import { DepartementDto } from '../models/departement-dto';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {

  periode = new PeriodeUpdateDto;
  plante = new PlanteModeleUpdateDto;
  departement = new DepartementDto;

  private URL = environment.baseUrl + 'periode';

  constructor(private http: HttpClient) { }

  create(periode: PeriodeCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, periode);
  }

  update(periode: PeriodeUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, periode);
  }

  getId(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + id);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }

  getAll(page:number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all/' + page);
  }

  // readByDepartementIdAndPlanteModelId
  getAllTypes(depId: number, plantId: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/alltypes?depId=' + depId + '&plantId=' + plantId);
  }
  
  // readByDepartementId
  getAllByDepartement(depId: number,page:number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/departement/' + depId+'?page='+page);
  }

  // readByPlanteModelIdAndDepartementIdAndType
  getAllByOneType(depId: number, plantId: number, type: PeriodeEnum): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/onetype?depId=' + depId + '&plantId=' + plantId + '&type=' + type);
  }

  // readByPlanteId
  getAllByPlante(plantId: number,page: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/plant/' + plantId + '?page=' + page);
  }

  getByDepAndPlanteModelIdAndType(depId: number, plantId: number, type: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/onetype?depId=' + depId + '&plantId=' + plantId + '&type=' + type);
  }
}
