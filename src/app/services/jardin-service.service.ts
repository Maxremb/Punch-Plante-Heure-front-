import { Injectable } from '@angular/core';
import { JardinCreateDto } from '../models/jardin-create-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JardinUpdateDto } from '../models/jardin-update-dto';
import { ResponseDto } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class JardinService {

  jardin: JardinCreateDto;

  private URL = environment.baseUrl + 'jardin';

  constructor(private http: HttpClient) { }

  create(jardin: JardinCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, jardin);
  }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  getId(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + id);
  }

  update(jardin: JardinUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, + jardin);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + id);
  }

}
