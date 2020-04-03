import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';

@Component({
  selector: 'app-graphique-jardin',
  templateUrl: './graphique-jardin.component.html',
  styleUrls: ['./graphique-jardin.component.css']
})
export class GraphiqueJardinComponent implements OnInit {

  constructor(private service: JardinService) { }

  jardin: JardinUpdateDto;
  matrice: Array<Array<String>>; //matrice bidimensionnelle représentant l'emplacement des plantes
  selection = "";
  plantes : Array<PlanteUtilisateurCreateDto>

  ngOnInit(): void {
    this.jardin = this.service.jardin;
    this.genererMatrice();
    this.plantes; //TO DO : recuperer la listes des plantes à placer
  }

  // Faire un espace aux bonnes proportions
  genererMatrice() {
    var nbLigne = this.jardin.width / 5; // on sépare notre espace par tranche de 5cm
    var nbCol = this.jardin.length / 5;

    for (let indexLigne = 0; indexLigne < nbLigne; indexLigne++) {
      this.matrice[indexLigne] = [];
      for (let indexCol = 0; indexCol < nbCol; indexCol++) {
        this.matrice[indexLigne][indexCol] = "";
      }
    }

  }

  modifOnClick(plante) {
    plante = this.selection;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  // changeEnChemin(x: number, y: number, selection :String) {
  //   this.matrice[y][x] = "chemin";
  // }

  // changeEnObstable(x: number, y: number) {
  //   this.matrice[y][x] = "obstacle";
  // }

  // changeEnVide(x: number, y: number) {
  //   this.matrice[y][x] = "";
  // }

  // changeEnPlante(x: number, y: number, plante: PlanteModeleCreateDto) {
  //   this.matrice[y][x] = plante.commun;
  // }


}
