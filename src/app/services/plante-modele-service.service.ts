import { Injectable } from '@angular/core';
import { modelPlantCreateDto } from '../models/plante-modele-create-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { modelPlantUpdateDto } from '../models/plante-modele-update-dto';
import { ResponseDto } from '../models/response-dto';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class modelPlantService {

  modelPlant: modelPlantCreateDto;

  private URL = environment.baseUrl + 'modelPlant';

  constructor(private http: HttpClient) { }

  create(modelPlant: modelPlantCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, modelPlant);
  }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  getId(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + id);
  }

  update(modelPlant: modelPlantUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, + modelPlant);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }

}
