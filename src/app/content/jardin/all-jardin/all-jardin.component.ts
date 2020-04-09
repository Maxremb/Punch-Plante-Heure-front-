import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto} from 'src/app/models/utilisateur-update-dto';

@Component({
  selector: 'app-all-jardin',
  templateUrl: './all-jardin.component.html',
  styleUrls: ['./all-jardin.component.css'],
})
export class AllJardinComponent implements OnInit {

  //liste de tout lesjardins de l'user
  allJardins :Array<JardinUpdateDto>;
  //jardin selectionné
  jardin :JardinUpdateDto;
  //user connecté
  utilisateurActif: UtilisateurUpdateDto;

  constructor(private service : JardinService, 
 //   private serviceUtilisateur : serviceUtilisateur
    ) { }

  ngOnInit(): void {
    this.getUtilisateur();
    this.readAllByIdUtilisateur();
  }


  getUtilisateur() : void {
    this.utilisateurActif= new UtilisateurUpdateDto();
    this.utilisateurActif.nom= "nom";
    this.utilisateurActif.id= 1;
  }

  // retourne la liste de tout les jardins de l'user conencté
  readAllByIdUtilisateur() {
    // this.service.getAllByUtilisateur(this.utilisateurActif.id, 0).subscribe(
    //  responseDto => {
    //     if (!responseDto.error) {
    //       this.allJardins = responseDto.body.content;
    //     }
    //     else { this.allJardins = [] }
    //   }
    // );
    this.service.getAll(0).subscribe(
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
    this.service.delete(identifier).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allJardins = this.allJardins.filter(
            element => element.identifier !== identifier);
        }
      }
    )
  }

  

}
