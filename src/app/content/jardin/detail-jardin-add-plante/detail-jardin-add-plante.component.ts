import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { JardinService } from 'src/app/services/jardin-service.service';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';

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
  messageValidation: string;
  messageErreur: string;
  allPlantes = new Array<PlanteModeleUpdateDto>();

  pageActive: number = 0;
  pageTotal: number[] = [];

  pageTotalUtil: number[] = [];
  pageActiveUtil: number = 0;
  pageMaxUtil: number = 0;

  constructor(
    private planteutilisateurservice: PlanteUtilisateurService,
    private plantemodeleservice: PlanteModeleService,
    private jardinservice: JardinService) { }

  // Valeurs initiales a recuperer
  ngOnInit(): void {
    // variable jardin stockee dans le service
    // this.jardin = this.jardinservice.jardin
    this.jardin = new JardinUpdateDto();
    this.jardin.identifier = 1;
    this.jardin.length = 1;
    this.jardin.width = 1;
    this.jardin.name = 'JardinTest';

    console.log('debug init Detail : ', this.jardin);


    // recuperation de la liste de toutes les plantes modeles
    this.getAllPlantes(0);
    console.log('DEBUG GET ALL' + this.allPlantes);

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

  getAllPlantes(npage: number): void {
    this.plantemodeleservice.getAll(npage).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.body.content;
          this.pageActive = responseDto.body.number;
          this.pageTotal = this.range(responseDto.body.totalPages);
        }
      }
    )
  }

  getListePlanteUtilisateur(npage: number): void {
    this.planteutilisateurservice.getAllByJardin(this.jardin.identifier, npage).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.listePlanteUtil = responseDto.body.content;
          this.pageActiveUtil = responseDto.body.number;
          this.pageTotalUtil = this.range(responseDto.body.totalPages);
          this.pageMaxUtil = responseDto.body.totalPages;
          console.log('DEBUG PAGE MAX' + this.pageMaxUtil);
        }
      }
    )
  }

  range(end) {
    return (new Array(end)).fill(undefined).map((_, i) => i);
  }

  ajouter() {
    this.plante.garden = this.jardin;
    console.log("DEBUG AJOUT " + this.plante.modelPlant.commun);

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

  suppprimer(id : number){
    console.log('DEBUG ID PLANTE A SUPPR =' + id)
    this.planteutilisateurservice.delete(id).subscribe(
      (responseDto) => {
        console.log("Plante supprimée de votre jardin");
        
      },

    );
  }


}
