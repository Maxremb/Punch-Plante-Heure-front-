import { Component, OnInit } from '@angular/core';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ConnectedUser } from 'src/app/models/connectedUser';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  user: ConnectedUser;
  utilisateur: UtilisateurUpdateDto = new UtilisateurUpdateDto();
  allJardins = new Array<JardinUpdateDto>();

  constructor(
    private jardinservice: JardinService,
    private utilisateurservice: UtilisateurService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    this.getUtilisateur();
    this.getAllJardins();
  }

  getUtilisateur() {
    if (this.user) {
      this.utilisateurservice.getUtilisateur(this.user.id).subscribe(
        (responseDto) => {
             if (!responseDto.error) {
                this.utilisateur = responseDto.body;
             }
           }
        );
    }
  }

  getAllJardins() {
    this.jardinservice.getAllByUtilisateur(this.utilisateur.identifier, 0).subscribe(
      responseDto => {
          if (!responseDto.error) {
            this.allJardins = responseDto.body.content;
          }
      },
      responseDtoerror => {
          if (responseDtoerror.error) {
            this.allJardins = [];
          }
      }
    );
  }
}
