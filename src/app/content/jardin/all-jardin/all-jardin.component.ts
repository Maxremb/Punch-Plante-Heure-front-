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
  allJardins = new Array<JardinUpdateDto>();
  //jardin selectionné
  jardin = new JardinUpdateDto;
  //user connecté
  utilisateurActif = new UtilisateurUpdateDto;

  constructor(private service : JardinService) { }

  ngOnInit(): void {
    // Affecter l'user actif
    //this.utilisateurActif = this.service.utilisateurActif

    //appel methode
    this.readAllByIdUtilisateur();
  }

  // retourne la liste de tout les jardins de l'user conencté
  readAllByIdUtilisateur() {
    this.service.getAllByUtilisateur(this.utilisateurActif.id).subscribe(
     responseDto => {
        if (!responseDto.error) {
          this.allJardins = responseDto.body;
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

  //transfert l'entite jardin vers service pour detail
  stockageJardin(jardinTransfert : JardinUpdateDto) {
    this.service.jardin = jardinTransfert ;
  }


}
