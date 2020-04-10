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

    return this.http.get<ConnexionDto>(this.URL + "?mail=" + mail + "&pwd=" + pwd);

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
    let adminUpDto = connexionDto.bodyAdmin;
    console.log(adminUpDto);
    let userUpDto = connexionDto.bodyUser;
    console.log(userUpDto);
    let isUser = connexionDto.isUser;
    this.connectedUser = new ConnectedUser();

    if (adminUpDto || userUpDto) {

      if (isUser) {
        this.connectedUser.id = userUpDto.identifier;
        this.connectedUser.pseudo = userUpDto.pseudo;
        this.connectedUser.mail = userUpDto.mail;

      } else {
        this.connectedUser.id = adminUpDto.identifier;
        this.connectedUser.pseudo = adminUpDto.pseudo;
        this.connectedUser.mail = adminUpDto.mail;
      }
      this.connectedUser.status = isUser;
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
