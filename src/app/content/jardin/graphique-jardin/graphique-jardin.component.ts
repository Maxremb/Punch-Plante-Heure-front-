import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';


@Component({
  selector: 'app-graphique-jardin',
  templateUrl: './graphique-jardin.component.html',
  styleUrls: ['./graphique-jardin.component.css']
})
export class GraphiqueJardinComponent implements OnInit {

  @Input() jardin: JardinUpdateDto;
  matrice = new Array<Array<string>>(); //matrice bidimensionnelle représentant l'emplacement des plantes
  selection: string = "";
  plantes: Array<PlanteUtilisateurCreateDto>;
  plantesPresentes: Array<PlanteUtilisateurUpdateDto>;

  constructor(private service: JardinService, private planteUtilisateurService: PlanteUtilisateurService) {

    // entrée d'un jardin spécifique pour test au lieu de this.jardinservice.jardin
    this.jardin = new JardinUpdateDto();
    this.jardin.identifier = 1;
    this.jardin.length = 1;
    this.jardin.width = 1;
    this.jardin.name = 'JardinTest';
    console.log('debug construct Graphique : ', this.jardin);
  }



  ngOnInit(): void {
    this.getPlantesPresentes();
    this.genererMatrice();
    this.plantes = this.planteUtilisateurService.listePlante;
    this.genererCarte();

  }

  // Faire un espace aux bonnes proportions
  genererMatrice() {
    var nbLigne = this.jardin.width * 100 / 5; // on sépare notre espace par tranche de 5cm
    var nbCol = this.jardin.length * 100 / 5;

    for (let indexLigne = 0; indexLigne < nbLigne; indexLigne++) {
      this.matrice[indexLigne] = [];
      for (let indexCol = 0; indexCol < nbCol; indexCol++) {
        this.matrice[indexLigne][indexCol] = "";
      }
    }
    //Pour chaque plante déjà présente dans le jardin on associe le nom commun à la bonne position dans la matrice 
    //TO DO : A NE FAIRE QUE POUR LES PLANTES QUI ONT DES COORDONNEES
    this.plantesPresentes.forEach(plante => 
      this.matrice[plante.coordonnees[3]][plante.coordonnees[2]] = plante.modelPlant.commun);

  }

  modifOnClick(y: number, x: number) {
    console.log('DEBUG MODIF ON CLICK' + this.matrice[y][x]);
    this.matrice[y][x] = this.selection;

    console.log('DEBUG MATRICE ' + this.matrice);
  }

  modifSelection(objet: string) {
    this.selection = objet;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  //Générer le canvas selon la matrice
  genererCarte() {
    var canvas = document.getElementById('carteJardin');
    //  var ctx = canvas.getContext('2d');
  }

  //Récupère les plantes déjà associées à ce jardin 
  getPlantesPresentes() {
    this.planteUtilisateurService.getAllByJardin(this.jardin.identifier).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesPresentes = responseDto.body.content;
        }
      }
    )
  }

  remiseAZero() {
    var nbLigne = this.jardin.width * 100 / 5; // on sépare notre espace par tranche de 5cm
    var nbCol = this.jardin.length * 100 / 5;

    for (let indexLigne = 0; indexLigne < nbLigne; indexLigne++) {
      this.matrice[indexLigne] = [];
      for (let indexCol = 0; indexCol < nbCol; indexCol++) {
        this.matrice[indexLigne][indexCol] = "";
      }
    }
  }

  //La matrice récupérée a déjà les plantes avec les coordonnées déjà placées 
  autogenerate(listePlantesCreate: Array<PlanteUtilisateurCreateDto>, matrice, listePlantesUpdate: Array<PlanteUtilisateurUpdateDto>) {
    let created = listePlantesCreate.filter(p => p.coordonnees != null);
    let updated = listePlantesUpdate.filter(p => p.coordonnees != null);
    let fini = false;

    // Tantque la matrice a de la place, on essaie de placer des plantes
    for (let index = 0; index < matrice.length; index++) {
      if (this.arrayRempli(matrice[index])) {
        for (let index2 = 0; index2 < matrice[index].length; index2++) {
          if (matrice[index][index2] == "") {
            if (updated.length > 0) {
              let p = updated.shift() //on retire le premier élement de la liste et on mappe la plante et la matrice
              matrice[index][index2] = p.modelPlant.commun;
              p.coordonnees[0] = index2;
              p.coordonnees[1] = index;
            } else if (created.length > 0) {
              let p = created.shift() //on retire le premier élement de la liste et on mappe la plante et la matrice
              matrice[index][index2] = p.modelPlant.commun;
              p.coordonnees[0] = index2;
              p.coordonnees[1] = index;
            } else {
              fini = true;
              break;
            }
          }
        }
        if(fini){
          break;
        }
      }
    }
  }

  //Permet de tester si il y a au moins un emplacement vide dans la matrice
  arrayRempli(matrice): boolean {
    var result = true;
    for (let index = 0; index < matrice.length; index++) {
      if (matrice[index] == "") {
        result = false;
        break;
      }
    }
    return result;
  }

}
