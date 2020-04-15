import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { ConnectedUser } from 'src/app/models/connectedUser';

@Component({
  selector: 'app-all-jardin',
  templateUrl: './all-jardin.component.html',
  styleUrls: ['./all-jardin.component.css'],
})
export class AllJardinComponent implements OnInit {

  //liste de tout lesjardins de l'user
  allJardins: Array<JardinUpdateDto>;
  jardin: JardinUpdateDto;
  
  // recuperation de l'utilisateur dans le localstorage
  user: ConnectedUser;
  

  constructor(
    private service: JardinService, 
    private servicePlanteUtilisateur: PlanteUtilisateurService,
    
  ) { }

  ngOnInit(): void {
    // recuperation du connectedUser
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    // recuperation des jardins de l'utilisateur
    this.readAllByIdUtilisateur();
  }

  // retourne la liste de tout les jardins de l'user conencté
  readAllByIdUtilisateur() {
    this.service.getAllByUtilisateur(this.user.id, 0).subscribe(
      responseDto => {
        if (!responseDto.error) {
          
          this.allJardins = responseDto.body.content;
        }
        else { this.allJardins = [] }
      }
    );
  }

  //supprime un jardin de l'user et refresh liste
  delete(identifier: number) {

    this.servicePlanteUtilisateur.deleteByJardin(identifier).subscribe(
      (resp) => {
        this.service.delete(identifier).subscribe(
          responseDto => {
            if (!responseDto.error) {
              this.allJardins = this.allJardins.filter(
                element => element.identifier !== identifier);

            }
          }
        )
      }
    )

  }



}
