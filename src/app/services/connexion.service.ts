import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnexionDto } from '../models/connexion-dto';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConnectedUser } from '../models/connectedUser';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private URL = environment.baseUrl + 'admin/mailAndPwd';

  public connectedUser: ConnectedUser;    //par défault null

  constructor(private http: HttpClient) {

  }


  getByEmailAndPwd(mail: string, pwd: string): Observable<ConnexionDto> {
    return this.http.post<ConnexionDto>(this.URL, [mail, pwd]);

  }

  connect(connexionDto: ConnexionDto): boolean {
    let success = this.convert(connexionDto)
    if (success) {
      localStorage.setItem('token', connexionDto.token);
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
        this.connectedUser.role = Role.Utilisateur;

      } else {
        this.connectedUser.id = connexionDto.bodyAdmin.identifier;
        this.connectedUser.pseudo = connexionDto.bodyAdmin.pseudo;
        this.connectedUser.mail = connexionDto.bodyAdmin.mail;
        this.connectedUser.role = Role.Admin;
      }

      return true;
    } else {
      return false;
    }
  }

  disconnect() {
    localStorage.clear();
    this.connectedUser = null;
  }

}
