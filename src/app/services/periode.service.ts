import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PeriodeCreateDto } from '../models/periode-create-dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/response-dto';
import { PeriodeUpdateDto } from '../models/periode-update-dto';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {

  periode = new PeriodeUpdateDto;

  private URL = environment.baseUrl + 'periode';

  constructor(private http: HttpClient) { }

  create(periode: PeriodeCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, periode);
  }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  getId(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + id);
  }

  update(periode: PeriodeUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, + periode);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }


}
