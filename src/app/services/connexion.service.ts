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


  getByEmailAndPwd(mail: string, pwd: string): Observable<ConnexionDto> {
    console.log("Utilisateur connecté!!");
    return this.http.post<ConnexionDto>(this.URL , [mail, pwd]);
    

  }

  connect(connexionDto: ConnexionDto): boolean {
    console.log('debug');
    let success = this.convert(connexionDto)
    if (success) {
      localStorage.setItem('connectedUser', JSON.stringify(this.connectedUser));
    }
    return success;
  }

  convert(connexionDto: ConnexionDto): boolean {
    this.connectedUser = new ConnectedUser();
    if (connexionDto.bodyAdmin || connexionDto.bodyUtil) {


      if (connexionDto.user) {
        this.connectedUser.id = connexionDto.bodyUtil.identifier;
        this.connectedUser.pseudo = connexionDto.bodyUtil.pseudo;
        this.connectedUser.mail = connexionDto.bodyUtil.mail;

      } else {
        this.connectedUser.id = connexionDto.bodyAdmin.identifier;
        this.connectedUser.pseudo = connexionDto.bodyAdmin.pseudo;
        this.connectedUser.mail = connexionDto.bodyAdmin.mail;
      }
      this.connectedUser.status = connexionDto.user;
      return true;
    } else {
      return false;
    }
  }

  disconnect() {
    console.log('DISCONNNNNNECTT')
    localStorage.clear();
    this.connectedUser = null;
  }

}
