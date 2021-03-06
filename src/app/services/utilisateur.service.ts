import { Injectable } from '@angular/core';
import { UtilisateurUpdateDto } from '../models/utilisateur-update-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../models/response-dto';
import { UtilisateurCreateDto } from '../models/utilisateur-create-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  utilisateur: UtilisateurUpdateDto;

  private URL = environment.baseUrl + 'utilisateur';

  constructor(private http: HttpClient) { }

  create(utilisateur: UtilisateurCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, utilisateur);
  }

  update(utilisateur: UtilisateurUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, utilisateur);
  }

  readByNomAndPrenom(lastname : string, firstname : string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/nomEtPrenom?nom=' + lastname + "&prenom=" + firstname);
  }

  isActif(pseudo: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/actif?pseudonyme=' + pseudo);
  }

  getAll(nbpage: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all/'+ nbpage);
  }

  desactivateUser(identifier: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/desactivate?id=' + identifier);
  }

  activateUser(identifier: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/activate?id=' + identifier);
  }

  getUtilisateur(identifier: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/' + identifier);
  }

  delete(identifier: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '/' + identifier);
  }
  


}
