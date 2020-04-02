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
  

  constructor(
    private location: Location,
    private planteutilisateurservice: PlanteUtilisateurService,
    private plantemodeleservice: PlanteModeleService,
    private jardinservice: JardinService) { }

  ngOnInit(): void {
    this.jardin = this.jardinservice.jardin;
    this.planteUtilisateur = this.planteutilisateurservice.planteUtilisateur;
    this.getAllPlantes();
    this.updateplanteForm = new FormGroup({
      "datePlantation": new FormControl(this.planteUtilisateur.datePlantation),
      "dateSemi": new FormControl(this.planteUtilisateur.dateSemi),
      "etatPlante": new FormControl(this.planteUtilisateur.etatPlante),
      "etatSante": new FormControl(this.planteUtilisateur.etatSante)
      });

  }

  getAllPlantes(): void {
    this.plantemodeleservice.getAll().subscribe(
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


  get nomCommun() { return this.updateplanteForm.get('nomCommun') }
  get datePlantation() { return this.updateplanteForm.get('datePlantation') }
  get dateSemi() { return this.updateplanteForm.get('dateSemi') }
  get etatPlante() { return this.updateplanteForm.get('etatPlante') }
  get etatSante() {return this.updateplanteForm.get('etatSante')}

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
