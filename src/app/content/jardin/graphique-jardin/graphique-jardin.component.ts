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
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-graphique-jardin',
  templateUrl: './graphique-jardin.component.html',
  styleUrls: ['./graphique-jardin.component.css']
})
export class GraphiqueJardinComponent implements OnInit {
  idJardin: number;
  message: string = '';
  planteok: boolean = false;
  obstacle: PlanteModeleUpdateDto;
  chemin: PlanteModeleUpdateDto;

  // Crée au lancement
  jardin: JardinUpdateDto;
  matrice = new Array<Array<string>>(); //matrice bidimensionnelle représentant l'emplacement des plantes
  selection: string = 'Aucune';
  plantesDuJardin: Array<PlanteUtilisateurUpdateDto>;

  // Recherche de plantes
  planteRechercher: string;
  resultatRecherche: Array<PlanteModeleUpdateDto>;
  planteSelectionner: PlanteModeleUpdateDto = new PlanteModeleUpdateDto();

  // Déplacer les plantes
  planteABouger : PlanteUtilisateurUpdateDto = new PlanteUtilisateurUpdateDto;



  constructor(private serviceJardin: JardinService,
     private servicePlanteUtilisateur: PlanteUtilisateurService,
     private servicePlanteModel: PlanteModeleService,
     private route: ActivatedRoute,) {
    
  }



  ngOnInit(): void {
    this.idJardin = +this.route.snapshot.paramMap.get('id');
    this.initialiserCheminObstacle();
    this.getJardin();
    
  }



  getJardin() {
    this.serviceJardin.getId(this.idJardin).subscribe(
      (responseDto) => {
        this.jardin = responseDto.body;
        this.getPlantesDejaPresentes()
      }
    );
  }


  // Récupère les plantes déjà associées à ce jardin 
  // Faire qqc pour les nombres de pages
  getPlantesDejaPresentes() {
    this.servicePlanteUtilisateur.getAllByJardinListe(this.idJardin).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesDuJardin = responseDto.body;
          this.planteok=true;
          this.genererMatrice();
        }
      }
    );
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
    this.plantesDuJardin.forEach(plante => {
      if(plante.coordonnees){
        this.matrice[plante.coordonnees[0]][plante.coordonnees[1]] = plante.modelPlant.commun;
      }
    }); 
  }


  initialiserCheminObstacle() {
    this.servicePlanteModel.getKeyWord('Obstacle', 0).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.obstacle = responseDto.body.content[0];
        }
      }
    );
    this.servicePlanteModel.getKeyWord('Chemin', 0).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.chemin = responseDto.body.content[0];
        }
      }
    );
  }


  // Change la valeur de la variable selection pas l'objet selectionner
  modifSelection(objet: string) {
    this.selection = objet;
  }


  trackByIndex(index: number, obj: any): any {
    return index;
  }


  remiseAZero() {
    this.plantesDuJardin.forEach(plante => {
      this.servicePlanteUtilisateur.delete(plante.identifiant).subscribe(
        (responseDto) => {
          if (!responseDto.error) {
            this.getPlantesDejaPresentes();
          }
        }
      );
    });
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


  viderLesResultats() {
    this.resultatRecherche = undefined;
    this.selection = 'Aucune';
    this.planteSelectionner = new PlanteModeleUpdateDto;
  }


  selectionnerPlante(planteChoisis: PlanteModeleUpdateDto){
    this.planteSelectionner = planteChoisis;
    this.selection = planteChoisis.commun;
  }


  addPlanteToJardin(plante: PlanteModeleUpdateDto, coordo: Array<number>) {
    if(this.matrice[coordo[0]][coordo[1]] == '') {
      var planteACree: PlanteUtilisateurCreateDto = new PlanteUtilisateurCreateDto;

      if ((this.selection != '') && (!this.planteABouger.coordonnees) && (this.planteSelectionner.commun)) {
        planteACree.coordonnees = coordo;
        planteACree.garden = this.jardin;
        planteACree.modelPlant = plante;
        this.servicePlanteUtilisateur.create(planteACree).subscribe(
          (ResponseDto) => {
            if (!ResponseDto.error) {
              this.plantesDuJardin.push(ResponseDto.body);
              this.getPlantesDejaPresentes();
            }
          }
        );
      }
    }
  }


  enleverPlanteDuJardinFromVide(coordo: Array<number>) {
    if ((this.selection == '') && (this.matrice[coordo[0]][coordo[1]] != '')) {
      this.servicePlanteUtilisateur.delete(
        this.plantesDuJardin.find(p => (
          JSON.stringify(coordo) === JSON.stringify(p.coordonnees)
          )).identifiant).subscribe(
        (ResponseDto) => {
          if (!ResponseDto.error) {
            this.getPlantesDejaPresentes();
          }
        }
      );
    }
  }
    

  enleverPlanteDuJardinFromListe(laPlante: PlanteUtilisateurUpdateDto, coordoDeLaPlante: Array<number>, nomDeLaPlante: string) {
    this.servicePlanteUtilisateur.delete(laPlante.identifiant).subscribe(
      (ResponseDto) => {
        if (!ResponseDto.error) {
          this.plantesDuJardin.splice(
            this.plantesDuJardin.indexOf(laPlante), 1
          );
        }
      }
    );
    this.matrice[coordoDeLaPlante[0]][coordoDeLaPlante[1]] = '';
    this.getPlantesDejaPresentes();
  }


  selectionnerPlanteABouger(laPlante: PlanteUtilisateurUpdateDto) {
    this.planteABouger = laPlante;
    this.selection = 'Mon jardin : ' + laPlante.modelPlant.commun;
  }

  deselectionnerPlanteABouger() {
    this.planteABouger = new PlanteUtilisateurUpdateDto;
    this.selection = 'Aucune';
  }

  attributionNouvellesCoordo(coordo: Array<number>) {
    if ((this.planteABouger.modelPlant) && (this.matrice[coordo[0]][coordo[1]] == '')) {

      if (this.planteABouger.coordonnees != null) {
        var anciennesCoordo: Array<number> = this.planteABouger.coordonnees;
      }

      this.planteABouger.coordonnees = coordo;

      this.servicePlanteUtilisateur.update(this.planteABouger).subscribe(
        (responseDto) => {
          if (!responseDto.error) {
            this.matrice[coordo[0]][coordo[1]] = this.planteABouger.modelPlant.commun;
            this.getPlantesDejaPresentes();
            this.planteSelectionner = new PlanteModeleUpdateDto();
            this.selection = 'Aucune';
            this.planteABouger = new PlanteUtilisateurUpdateDto;
            if (anciennesCoordo){this.matrice[anciennesCoordo[0]][anciennesCoordo[1]] = '';}
          }
        }
      );      
    }
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
