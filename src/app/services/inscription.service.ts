import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilisateurCreateDto } from '../models/utilisateur-create-dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private URL = environment.baseUrl + 'utilisateur';

  save(util: UtilisateurCreateDto){

    return this.http.post<ResponseDto>(this.URL, util);

  }

  constructor(private http: HttpClient) { }
}
