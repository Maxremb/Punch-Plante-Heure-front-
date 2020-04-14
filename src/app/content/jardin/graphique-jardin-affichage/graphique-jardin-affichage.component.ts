import { Component, OnInit, Input } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

@Component({
  selector: 'app-graphique-jardin-affichage',
  templateUrl: './graphique-jardin-affichage.component.html',
  styleUrls: ['./graphique-jardin-affichage.component.css']
})
export class GraphiqueJardinAffichageComponent implements OnInit {

  @Input() jardin: JardinUpdateDto;
  matrice = new Array<Array<string>>(); //matrice bidimensionnelle représentant l'emplacement des plantes
  plantesPresentes = new Array<PlanteUtilisateurUpdateDto>();

  plante = new PlanteUtilisateurUpdateDto();
  model = new PlanteModeleUpdateDto();

  constructor(private service: JardinService, private planteUtilisateurService: PlanteUtilisateurService, private servicePlante: PlanteModeleService) { }

  ngOnInit(): void {
    this.getPlantesDejaPresentes();


  }

  // Faire un espace aux bonnes proportions
  genererMatrice() {
    var nbLigne = this.jardin.width * 100 / 50;
    var nbCol = this.jardin.length * 100 / 50;
    for (let indexLigne = 0; indexLigne < nbLigne; indexLigne++) {
      this.matrice[indexLigne] = [];
      for (let indexCol = 0; indexCol < nbCol; indexCol++) {
        this.matrice[indexLigne][indexCol] = "";
      }
    }
    
    // Pour chaque plante déjà présente dans le jardin on associe le nom commun à la bonne position dans la matrice 
    // TO DO : A NE FAIRE QUE POUR LES PLANTES QUI ONT DES COORDONNEES
    this.plantesPresentes.forEach(plante => {
      if(plante.coordonnees){
        this.matrice[plante.coordonnees[0]][plante.coordonnees[1]] = plante.modelPlant.commun;
      }
    }); 
  }

  getPlantesDejaPresentes() {
    this.planteUtilisateurService.getAllByJardinListe(this.jardin.identifier).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesPresentes = responseDto.body;
          this.genererMatrice();
        }
      }
    );
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  
}
