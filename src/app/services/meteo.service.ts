import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/response-dto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  
  private URL = environment.baseUrl + 'meteo';


  constructor(private http: HttpClient) { }


  getMeteoByMonthAndDepartement(month: number, year: number, depNum: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/moisdepartement?annee=' + year + '&depNum=' + depNum +'&mois='+ month);
  }
}
