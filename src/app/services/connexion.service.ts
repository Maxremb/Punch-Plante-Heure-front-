import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilisateurUpdateDto } from '../models/utilisateur-update-dto';
import { AdminUpdateDto } from '../models/admin-update-dto';
import { ConnexionDto } from '../models/connexion-dto';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../models/response-dto';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConnectedUser } from '../models/connectedUser';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private URL = environment.baseUrl + 'admin/mailAndPwd';
  
  public connectedUser: ConnectedUser;    //par défault null

  constructor(private http: HttpClient) {

  }


  getByEmailAndPwd(mail: string, pwd: string) : any {
    console.log("Utilisateur connecté!!")
    this.connectedUser = new ConnectedUser();
    this.connectedUser.id = 1 ;
    this.connectedUser.pseudo = 'tony';
    this.connectedUser.mail = 'Stark@avengers.com';
    this.connectedUser.status = true;
    
    localStorage.setItem('connectedUser', JSON.stringify(this.connectedUser) );
    return this.connectedUser;

  }

  disconnect(){
    console.log('DISCONNNNNNECTT')
    localStorage.clear();
    this.connectedUser = null;
  }

}
