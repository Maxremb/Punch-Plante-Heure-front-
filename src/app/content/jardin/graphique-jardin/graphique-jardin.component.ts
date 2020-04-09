import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { prependListener } from 'process';


@Component({
  selector: 'app-graphique-jardin',
  templateUrl: './graphique-jardin.component.html',
  styleUrls: ['./graphique-jardin.component.css']
})
export class GraphiqueJardinComponent implements OnInit {
  message: string = '';

  // Crée au lancement
  jardin: JardinUpdateDto = new JardinUpdateDto;
  matrice = new Array<Array<string>>(); //matrice bidimensionnelle représentant l'emplacement des plantes
  selection: string = "";
  plantesDuJardin: Array<PlanteUtilisateurUpdateDto> = new Array();

  // Recherche de plantes
  planteRechercher: string;
  resultatRecherche: Array<PlanteModeleUpdateDto>;
  planteSelectionner: PlanteModeleUpdateDto = new PlanteModeleUpdateDto();
  
  // Ajouter une plante au jardin
  planteACree: PlanteUtilisateurCreateDto = new PlanteUtilisateurCreateDto();



  constructor(private serviceJardin: JardinService, private servicePlanteUtilisateur: PlanteUtilisateurService, private servicePlanteModel: PlanteModeleService,) {

    // entrée d'un jardin spécifique pour test au lieu de this.jardinservice.jardin
    this.jardin = new JardinUpdateDto();
    this.jardin.identifier = 1;
    this.jardin.length = 1;
    this.jardin.width = 1;
    this.jardin.name = 'JardinTest';
  }



  ngOnInit(): void {
    this.getPlantesDejaPresentes();
    this.genererMatrice();
  }



  // Récupère les plantes déjà associées à ce jardin 
  // Faire qqc pour les nombres de pages
  getPlantesDejaPresentes() {
    this.servicePlanteUtilisateur.getAllByJardin(this.jardin.identifier, 0).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesDuJardin = responseDto.body.content;
        }
      }
    );
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
    // Pour chaque plante déjà présente dans le jardin on associe le nom commun à la bonne position dans la matrice 
    // TO DO : A NE FAIRE QUE POUR LES PLANTES QUI ONT DES COORDONNEES
    this.plantesDuJardin.forEach(plante =>
      this.matrice[plante.coordonnees[3]][plante.coordonnees[2]] = plante.modelPlant.commun);
  }


  // Change la valeur de la variable selection pas l'objet selectionner
  modifSelection(objet: string) {    
    if ((objet == 'vide') || (objet == 'obstacle') || (objet == 'chemin') || (objet == 'plante')) {
      this.selection = '';
      this.planteSelectionner = new PlanteModeleUpdateDto;
    }
    this.selection = objet;
  }

  
  // Change la valeur dans la matrice pour y mettre ce qu'il y a dans la valeur selection
  modifOnClick(y: number, x: number) {
    this.matrice[y][x] = this.selection;

    console.log('DEBUG MATRICE ' + this.matrice);
  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }


  // Fait une update du jardin
  sauvgardeJardin() {
    // Change uniquement les chemins (parce que le reste n'est pas stockers dans le jardin)
    this.serviceJardin.update(this.jardin)

    // Met à jours toutes les plantes présentes dans la liste des plantes correspondante à ce jardin
    for (let p of this.plantesDuJardin) {
      this.servicePlanteUtilisateur.update(p);
    }
  }


  // Efface juste la grille pour l'instant
  remiseAZero() {
    var nbLigne = this.jardin.width * 100 / 5; // on sépare notre espace par tranche de 5cm
    var nbCol = this.jardin.length * 100 / 5;

    for (let indexLigne = 0; indexLigne < nbLigne; indexLigne++) {
      this.matrice[indexLigne] = [];
      for (let indexCol = 0; indexCol < nbCol; indexCol++) {
        this.matrice[indexLigne][indexCol] = "";
      }
    }
    this.plantesDuJardin = new Array;
  }


  rechercherPlante(recherche: string) {
    this.message = '';
    this.resultatRecherche = undefined;
    this.servicePlanteModel.getKeyWord(recherche, 0).subscribe(
      ResponseDto => {
        if (!ResponseDto.error) {
          this.resultatRecherche = ResponseDto.body.content;
        }
        if (!(ResponseDto.body.totalPages>0)) {
          this.message = 'Aucunes plantes trouvées pour ce mot clé...';
        }
      }
    );
  }


  selectionnerPlante(planteChoisis: PlanteModeleUpdateDto){
    this.planteSelectionner = planteChoisis;
    this.selection = planteChoisis.commun;

    
    console.log('plante selectionner : ', this.planteSelectionner)
    console.log('plante selectionner id : ', this.planteSelectionner.identifiant)

  }


  addPlanteToJardin(plante: PlanteModeleUpdateDto, coordo: Array<number>) {
    if (this.selection != '' && this.selection != 'obstacle' && this.selection != 'chemin' && this.selection != 'plante') {
      this.planteACree = new PlanteUtilisateurCreateDto;
      this.planteACree.coordonnees = coordo;
      this.planteACree.garden = this.jardin;
      this.planteACree.modelPlant = plante;

      console.log('plante selectionner id : ', this.planteSelectionner.identifiant)
      console.log('planteModel id : ', plante.identifiant);
      console.log('planteModel nom : ', plante.commun);
      console.log('le jardin : ', this.jardin);
      console.log('les coordo : ', coordo);

      this.servicePlanteUtilisateur.create(this.planteACree).subscribe(
        ResponseDto => {
          if (!ResponseDto.error) {
            this.plantesDuJardin = ResponseDto.body.content;
          }
        }
      );
    }
  }
    

  enleverPlanteDuJardin(laPlante: PlanteUtilisateurUpdateDto, coordoDeLaPlante: Array<number>, nomDeLaPlante: string) {
    this.plantesDuJardin.splice(
      this.plantesDuJardin.indexOf(laPlante, 1)
    )

    this.servicePlanteUtilisateur.delete(laPlante.identifiant);

    this.matrice[coordoDeLaPlante[0]][coordoDeLaPlante[1]] = '';
  }


  //La matrice récupérée a déjà les plantes avec les coordonnées déjà placées 
  // autogenerate() {
  //   let created = this.plantesDuJardin;
  //   let updated = this.plantesDuJardin.filter(p => p.coordonnees == null);
  //   let fini = false;

  //   // Tantque la matrice a de la place, on essaie de placer des plantes
  //   for (let index = 0; index < this.matrice.length; index++) {
  //     if (!this.arrayRempli(this.matrice[index])) {
  //       for (let index2 = 0; index2 < this.matrice[index].length; index2++) {
  //         if (this.matrice[index][index2] == "") {
  //           if (updated.length > 0) {
  //             let p = updated.shift() //on retire le premier élement de la liste et on mappe la plante et la matrice
  //             this.matrice[index][index2] = p.modelPlant.commun;
  //             p.coordonnees[0] = index2;
  //             p.coordonnees[1] = index;
  //             this.plantesDuJardin.push(p);
  //           } else if (created.length > 0) {
  //             let p = created.shift() //on retire le premier élement de la liste et on mappe la plante et la matrice
  //             this.matrice[index][index2] = p.modelPlant.commun;
  //             p.coordonnees[0] = index2;
  //             p.coordonnees[1] = index;
  //             this.plantesDuJardin.push(p);
  //           } else {
  //             fini = true;
  //             break;
  //           }
  //         }
  //       }
  //       if(fini){
  //         break;
  //       }
  //     }
  //   }
  // }


  //Permet de tester si il y a au moins un emplacement vide dans la matrice
  // arrayRempli(matrice): boolean {
  //   var result = true;
  //   for (let index = 0; index < matrice.length; index++) {
  //     if (matrice[index] == "") {
  //       result = false;
  //       break;
  //     }
  //   }
  //   return result;
  // }

}
