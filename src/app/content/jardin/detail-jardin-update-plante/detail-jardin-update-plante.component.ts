import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { JardinService } from 'src/app/services/jardin-service.service';

@Component({
  selector: 'app-detail-jardin-update-plante',
  templateUrl: './detail-jardin-update-plante.component.html',
  styleUrls: ['./detail-jardin-update-plante.component.css']
})
export class DetailJardinUpdatePlanteComponent implements OnInit {

  planteForm: FormGroup;
  planteUtilisateur: PlanteUtilisateurUpdateDto;
  jardin: JardinUpdateDto;
  messageValidation: string;
  messageErreur: string;
  allPlantes = new Array<PlanteModeleUpdateDto>();

  constructor(
    private planteutilisateurservice: PlanteUtilisateurService,
    private plantemodeleservice: PlanteModeleService,
    private jardinservice: JardinService) { }

  ngOnInit(): void {
    this.jardin = this.jardinservice.jardin;
    this.planteUtilisateur = this.planteutilisateurservice.planteUtilisateur;
    this.getAllPlantes();
    this.planteForm = new FormGroup({
      "nomCommun": new FormControl(this.planteUtilisateur.planteModele.nomCommun, Validators.required),
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
          this.allPlantes = responseDto.object;
        }
      }
    )
  }

  get nomCommun() { return this.planteForm.get('nomCommun') }
  get datePlantation() { return this.planteForm.get('datePlantation') }
  get dateSemi() { return this.planteForm.get('dateSemi') }
  get etatPlante() { return this.planteForm.get('etatPlante') }
  get etatSante() {return this.planteForm.get('etatSante')}

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
