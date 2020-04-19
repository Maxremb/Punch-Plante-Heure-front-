import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { ActivatedRoute } from '@angular/router';
import { healthStageEnum } from 'src/app/enums/etat-sante-enum.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-jardin-update-plante',
  templateUrl: './detail-jardin-update-plante.component.html',
  styleUrls: ['./detail-jardin-update-plante.component.css']
})
export class DetailJardinUpdatePlanteComponent implements OnInit {

  updateplanteForm: FormGroup;
  planteUtilisateur: PlanteUtilisateurUpdateDto;
  messageValidation: string;
  messageErreur: string;
  idJardin: number;

  planteUtilId: number;

  plantePersonnelle = false;

  // Injection des dependances service necessaires
  constructor(
    private planteutilisateurservice: PlanteUtilisateurService,
    private plantemodeleervice: PlanteModeleService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  // Creation des valeurs initiales
  ngOnInit(): void {
    //récupération de l'id plante
    this.planteUtilId = +this.route.snapshot.paramMap.get('id');
    this.getPlanteUtil();
    this.checkPlant();

  }

  get plantingDate() { return this.updateplanteForm.get('plantingDate') }
  get semiDate() { return this.updateplanteForm.get('semiDate') }
  get plantStage() { return this.updateplanteForm.get('plantStage') }
  get healthStage() { return this.updateplanteForm.get('healthStage') }

  getPlanteUtil() {
    this.planteutilisateurservice.getId(this.planteUtilId).subscribe(
      (resp) => {
        this.planteUtilisateur = resp.body;
        this.idJardin = this.planteUtilisateur.garden.identifier
        // Definition du formulaire de modification des plantes utilisateurs
        this.updateplanteForm = new FormGroup({
          "plantingDate": new FormControl(this.planteUtilisateur.plantingDate),
          "semiDate": new FormControl(this.planteUtilisateur.semiDate),
          "plantStage": new FormControl(this.planteUtilisateur.plantStage),
          "healthStage": new FormControl(this.planteUtilisateur.healthStage)
        });

      }
    )
  }


  // methode update permettant la mise à jour d'une plante utilisateur dans la base de données
  update(): void {
    this.planteutilisateurservice.update(this.planteUtilisateur).subscribe(
      (responseDto) => {

        this.messageValidation = 'Votre plante a été modifiée';        

      },
      (responseDtoErreur) => {
        if (responseDtoErreur.error) {
          this.messageErreur = 'Erreur de modification';
        }
      }
    );
  }

  checkPlant(): void{
    const token = localStorage.getItem('token');
    this.authService.getUserPlants(token).subscribe(
      plants => {
        if (plants.indexOf(this.planteUtilId) !== -1){
          this.plantePersonnelle = true;
        }
      }
    );
  }
}
