import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilisateurUpdateDto } from '../models/utilisateur-update-dto';
import { AdminUpdateDto } from '../models/admin-update-dto';
import { ConnexionDto } from '../models/connexion-dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../models/response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private URL = environment.baseUrl + 'connexion';

  constructor(private http: HttpClient) { }


  getByEmailAndPwd(mail: string, pwd: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL);
  }

}
