import { Component, OnInit } from '@angular/core';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { ConnectedUser } from 'src/app/models/connectedUser';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: ConnectedUser;
  message: string;
  utilisateur: UtilisateurUpdateDto = new UtilisateurUpdateDto();
  
  constructor( private service: UtilisateurService ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    this.getUtilisateur();
  }

  getUtilisateur() {
    this.service.getUtilisateur(this.user.id).subscribe(
      (responseDto) => {
           if (!responseDto.error) {
              this.utilisateur = responseDto.body;
           }
         }
      );
  }

  desactiver(id: number) {
    this.service.desactivateUser(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.utilisateur.active = false;
          this.message = 'Votre compte est désactivé';
        }
      },
      (error) => {
        if (error.error) {
          this.utilisateur.active = true;
          this.message = 'Erreur lors de la désactivation';
        }
      }
    );
  }

  activer(id: number) {
    this.service.activateUser(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.utilisateur.active = true;
          this.message = 'Votre compte est activé';
        }
      },
      (error) => {
        if (error.error) {
          this.utilisateur.active = false;
          this.message = 'Erreur lors de l\'activation';
        }
      }
    );
  }
  
}
