import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { modelPlantUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { modelPlantService } from 'src/app/services/plante-modele-service.service';
import { JardinService } from 'src/app/services/jardin-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-jardin-update-plante',
  templateUrl: './detail-jardin-update-plante.component.html',
  styleUrls: ['./detail-jardin-update-plante.component.css']
})
export class DetailJardinUpdatePlanteComponent implements OnInit {

  updateplanteForm: FormGroup;
  planteUtilisateur: PlanteUtilisateurUpdateDto;
  jardin: JardinUpdateDto;
  messageValidation: string;
  messageErreur: string;
  allPlantes = new Array<modelPlantUpdateDto>();
  

  constructor(
    private location: Location,
    private planteutilisateurservice: PlanteUtilisateurService,
    private modelPlantservice: modelPlantService,
    private jardinservice: JardinService) { }

  ngOnInit(): void {
    this.jardin = this.jardinservice.jardin;
    this.planteUtilisateur = this.planteutilisateurservice.planteUtilisateur;
    this.getAllPlantes();
    this.updateplanteForm = new FormGroup({
      "plantingDate": new FormControl(this.planteUtilisateur.plantingDate),
      "semiDate": new FormControl(this.planteUtilisateur.semiDate),
      "plantStage": new FormControl(this.planteUtilisateur.plantStage),
      "healthStage": new FormControl(this.planteUtilisateur.healthStage)
      });

  }

  getAllPlantes(): void {
    this.modelPlantservice.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.body;
        }
      }
    )
  }

  retour(): void {
    this.location.back();
  }


  get commun() { return this.updateplanteForm.get('commun') }
  get plantingDate() { return this.updateplanteForm.get('plantingDate') }
  get semiDate() { return this.updateplanteForm.get('semiDate') }
  get plantStage() { return this.updateplanteForm.get('plantStage') }
  get healthStage() {return this.updateplanteForm.get('healthStage')}

  update(): void {
    this.planteutilisateurservice.update(this.planteUtilisateur).subscribe(
      (responseDto) => {
            if (!responseDto.error) {
                this.messageValidation = 'Votre plante a été modifiée';
            }
      },
      (responseDtoErreur) => {
            if (responseDtoErreur.error) {
                this.messageErreur = 'Erreur de modification';
            }
      }
    );
  }
}
