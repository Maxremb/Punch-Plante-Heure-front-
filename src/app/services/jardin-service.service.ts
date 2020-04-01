import { Injectable } from '@angular/core';
import { JardinCreateDto } from '../models/jardin-create-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JardinResponseDto } from '../models/jardin-response-dto';
import { JardinUpdateDto } from '../models/jardin-update-dto';

@Injectable({
  providedIn: 'root'
})
export class JardinService {

  jardin: JardinCreateDto;

  private URL = environment.baseUrl + 'jardin';

  constructor(private http: HttpClient) { }

  create(jardin: JardinCreateDto): Observable<JardinResponseDto> {
    return this.http.post<JardinResponseDto>(this.URL, jardin);
  }

  getAll(): Observable<JardinResponseDto> {
    return this.http.get<JardinResponseDto>(this.URL + '/all');
  }

  getId(id: number): Observable<JardinResponseDto> {
    return this.http.get<JardinResponseDto>(this.URL + '/' + id);
  }

  update(jardin: JardinUpdateDto): Observable<JardinResponseDto> {
    return this.http.put<JardinResponseDto>(this.URL, + jardin);
  }

  delete(id: number): Observable<JardinResponseDto> {
    return this.http.delete<JardinResponseDto>(this.URL + '/' + id);
  }

}
