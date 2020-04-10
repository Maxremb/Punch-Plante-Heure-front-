import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/response-dto';
import { HttpClient } from '@angular/common/http';
import { UtilisateurCreateDto } from '../models/utilisateur-create-dto';
import { UtilisateurUpdateDto } from '../models/utilisateur-update-dto';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  utilisateur: UtilisateurCreateDto;

  private URL = environment.baseUrl + 'utilisateur';

  constructor(private http: HttpClient) { }

  create(utilisateur: UtilisateurCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, utilisateur);
  }

  update(utilisateur: UtilisateurUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, utilisateur);
  }

  readByNomAndPrenom(lastname : string,firstname : string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + lastname + firstname);
  }

  isActif(pseudo: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + pseudo);
  }

  getAll(nbpage: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all/'+ nbpage);
  }

  desactivateUser(identifier: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + identifier);
  }

  activateUser(identifier: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + identifier);
  }

  existsByEmailAndMdp(mail: string, pwd : string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + mail + pwd);

}
}
