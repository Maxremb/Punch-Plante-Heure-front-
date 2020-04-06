import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
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
  allPlantes = new Array<PlanteModeleUpdateDto>();
  
  // Injection des dependances service necessaires
  constructor(
    private planteutilisateurservice: PlanteUtilisateurService,
    private plantemodeleervice: PlanteModeleService,
    private jardinservice: JardinService) { }

  // Creation des valeurs initiales
  ngOnInit(): void {
    // Recuperation de la variable jardin stockee dans le service
    this.jardin = this.jardinservice.jardin;
    // Recuperation de la variable planteUtilisateur stockee dans le service
    this.planteUtilisateur = this.planteutilisateurservice.planteUtilisateur;
    this.getAllPlantes(1);
    // Recuperation de la liste de toutes les plantes presentes dans model
    // Definition du formulaire de modification des plantes utilisateurs
    this.updateplanteForm = new FormGroup({
      "plantingDate": new FormControl(this.planteUtilisateur.plantingDate),
      "semiDate": new FormControl(this.planteUtilisateur.semiDate),
      "plantStage": new FormControl(this.planteUtilisateur.plantStage),
      "healthStage": new FormControl(this.planteUtilisateur.healthStage)
      });

  }

  getAllPlantes(npage:number): void {
    this.plantemodeleervice.getAll(npage).subscribe(
  // Recuperation de la liste de toutes les plantes presentes dans model
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.body;
        }
      }
    )
  }

 
  get plantingDate() { return this.updateplanteForm.get('plantingDate') }
  get semiDate() { return this.updateplanteForm.get('semiDate') }
  get plantStage() { return this.updateplanteForm.get('plantStage') }
  get healthStage() {return this.updateplanteForm.get('healthStage')}

  // methode update permettant la mise à jour d'une plante utilisateur dans la base de données
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
