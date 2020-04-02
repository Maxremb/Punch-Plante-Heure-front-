import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { JardinService } from 'src/app/services/jardin-service.service';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-jardin-add-plante',
  templateUrl: './detail-jardin-add-plante.component.html',
  styleUrls: ['./detail-jardin-add-plante.component.css']
})
export class DetailJardinAddPlanteComponent implements OnInit {

  planteForm: FormGroup;
  plante: PlanteUtilisateurCreateDto;
  jardin: JardinUpdateDto;
  messageValidation: string;
  messageErreur: string;
  allPlantes = new Array<PlanteModeleUpdateDto>();
 

  constructor(
    private location: Location,
    private planteutilisateurservice: PlanteUtilisateurService,
    private plantemodeleservice: PlanteModeleService,
    private jardinservice: JardinService) { }

  ngOnInit(): void {
    this.jardin = this.jardinservice.jardin;
    this.getAllPlantes();
    this.planteForm = new FormGroup({
      "commun": new FormControl(this.plante.planteModele.commun, Validators.required),
      "datePlantation": new FormControl(this.plante.datePlantation),
      "periodesemi": new FormControl(this.plante.periodesemi),
      "etatPlante": new FormControl(this.plante.etatPlante),
      "etatSante": new FormControl(this.plante.etatSante)
      });
  }
  
  get commun() { return this.planteForm.get('commun') }
  get datePlantation() { return this.planteForm.get('datePlantation') }
  get periodesemi() { return this.planteForm.get('periodesemi') }
  get etatPlante() { return this.planteForm.get('etatPlante') }
  get etatSante() {return this.planteForm.get('etatSante')}

  getAllPlantes(): void {
    this.plantemodeleservice.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.object;
        }
      }
    )
  }

  retour(): void {
    this.location.back();
  }


  ajouter() {
      this.plante.jardin = this.jardin;
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
  }
}
