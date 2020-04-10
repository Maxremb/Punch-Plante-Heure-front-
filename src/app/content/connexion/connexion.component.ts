import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ConnexionDto } from 'src/app/models/connexion-dto';
import { AdminUpdateDto } from 'src/app/models/admin-update-dto';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;

  connexion: ConnexionDto;

  admin: AdminUpdateDto;

  utilisateur: UtilisateurUpdateDto;

  mail: string;

  pwd: string;

  messageValidation = '';
  error: boolean;


  constructor(private service: ConnexionService) { }

  ngOnInit(): void {
    console.log("init component ")
    this.connexionForm = new FormGroup({
      mail: new FormControl(this.mail,
        [Validators.required, Validators.email]),
      pwd: new FormControl(this.pwd, [Validators.required, Validators.minLength(8)]),
    });
  }


  connect(mail: string, pwd: string){
    console.log("email ::::::::::::", mail)
    this.service.getByEmailAndPwd(mail, pwd);

  }


  /*connect(mail: string, pwd: string) {
    this.service.getByEmailAndPwd(mail, pwd).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.connexion = responsedto.body
          if (this.connexion.isAdmin) {
            responsedto.body = this.admin;
            this.messageValidation = 'BRAVO ! Vous êtes maintenant connecté en tant qu\'administrateur !';
            this.error = false;
          } else if (!this.connexion.isAdmin) {
            responsedto.body = this.utilisateur;
            this.messageValidation = 'BRAVO ! Vous êtes maintenant connecté en tant qu\'utilisateur !';
            this.error = false;
          }
        } (error) => {
          console.log('debug responseDto : ', error);
          this.messageValidation = 'ERREUR ! La connexion a echoué !';
          this.error = true;
        }

      }

    );
  }*/

}
