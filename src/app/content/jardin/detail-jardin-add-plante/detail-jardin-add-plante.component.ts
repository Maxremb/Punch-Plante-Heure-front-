import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { JardinService } from 'src/app/services/jardin-service.service';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-jardin-add-plante',
  templateUrl: './detail-jardin-add-plante.component.html',
  styleUrls: ['./detail-jardin-add-plante.component.css']
})
export class DetailJardinAddPlanteComponent implements OnInit {

  planteForm: FormGroup;
  plante = new PlanteUtilisateurCreateDto();
  listePlanteUtil = new Array<PlanteUtilisateurUpdateDto>();
  jardin: JardinUpdateDto;
  idJardin: number;
  messageValidation: string;
  messageErreur: string;
  allPlantes = new Array<PlanteModeleUpdateDto>();

  pageActive: number = 0;
  pageTotal: number[] = [];

  pageTotalUtil: number[] = [];
  pageActiveUtil: number = 0;
  pageMaxUtil: number = 0;

  //Attributs de recherche des plantes modèles
  keyWord: string;
  nbPlantesTotal: number;

  constructor(
    private planteutilisateurservice: PlanteUtilisateurService,
    private plantemodeleservice: PlanteModeleService,
    private jardinservice: JardinService,
    private route: ActivatedRoute) { }

  // Valeurs initiales a recuperer
  ngOnInit(): void {
    //On récupère l'id de notre jardin dans l'url
    this.idJardin = +this.route.snapshot.paramMap.get('id');
    this.getJardin();
  
    
    //Récupération de la liste des plantes utilisateurs associées à ce jardin
    this.getListePlanteUtilisateur(0);

    // definition du formulaire
    this.planteForm = new FormGroup({
      "commun": new FormControl(this.plante.modelPlant, Validators.required),
      "plantingDate": new FormControl(this.plante.plantingDate),
      "semiDate": new FormControl(this.plante.semiDate),
      "plantStage": new FormControl(this.plante.plantStage),
      "healthStage": new FormControl(this.plante.healthStage)
    });
  }

  get commun() { return this.planteForm.get('commun') }
  get plantingDate() { return this.planteForm.get('plantingDate') }
  get semiDate() { return this.planteForm.get('semiDate') }
  get plantStage() { return this.planteForm.get('plantStage') }
  get healthStage() { return this.planteForm.get('healthStage') }

  //Récupération de toutes les plantes modèles
  getAllPlantes(npage: number): void {
    this.plantemodeleservice.getAll(npage).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.body.content;
          this.pageActive = responseDto.body.number;
          this.pageTotal = this.range(responseDto.body.totalPages);
          for (let index = 1; index < responseDto.body.totalPages; index++) {
            this.plantemodeleservice.getAll(index).subscribe((resp) => {
              resp.body.content.forEach(element => {
                this.allPlantes.push(element);
                
              });
            })
          }
        }
      }
    )
  }

  getListePlanteUtilisateur(npage: number): void {
    this.planteutilisateurservice.getAllByJardin(this.idJardin, npage).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.listePlanteUtil = responseDto.body.content;
          this.pageActiveUtil = responseDto.body.number;
          this.pageTotalUtil = this.range(responseDto.body.totalPages);
          this.pageMaxUtil = responseDto.body.totalPages;
        
        }
      }
    )
  }

  getJardin() {
    this.jardinservice.getId(this.idJardin).subscribe((resp) => {
      this.jardin = resp.body;
      
    });
    console.log('DEBUG JARDIN DETAIL', this.jardin)
  }

  range(end) {
    return (new Array(end)).fill(undefined).map((_, i) => i);
  }

  ajouter() {
    this.plante.garden = this.jardin;
    console.log("DEBUG AJOUT ", this.plante);

    this.planteutilisateurservice.create(this.plante).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageValidation = "Plante ajoutée à votre jardin";

        }
      },
      (responseDtoErreur) => {
        if (responseDtoErreur.error) {
          this.messageErreur = "Erreur d'ajout";
        }
      }
    );
    this.getListePlanteUtilisateur(this.pageActiveUtil);
  }

  suppprimer(id: number) {
    this.planteutilisateurservice.delete(id).subscribe(
      (responseDto) => {
    
        this.listePlanteUtil = this.listePlanteUtil.filter(p => p.identifiant != id);

      },

    );
  }

  search(term: string ): void {
    if(term.length>=3){
    this.plantemodeleservice.getKeyWord(term, 0).subscribe(
      (resp)=> {
        this.allPlantes = resp.body.content;
        this.nbPlantesTotal =resp.body.totalElements;
        for (let index = 1; index < resp.body.totalPages; index++) {
          this.plantemodeleservice.getKeyWord(term,index).subscribe((response) => {
            response.body.content.forEach(element => {
              this.allPlantes.push(element);
              
            });
          });
        }
      }
    )

  }
  }

}
