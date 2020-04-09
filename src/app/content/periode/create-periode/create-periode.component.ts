import { Component, OnInit } from '@angular/core';
import { PeriodeService } from 'src/app/services/periode.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeriodeCreateDto } from 'src/app/models/periode-create-dto';
import { PlanteModeleListe } from 'src/app/models/plante-modele-liste';
import { DepartementDto } from 'src/app/models/departement-dto';
import { ActivatedRoute } from '@angular/router';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

@Component({
  selector: 'app-create-periode',
  templateUrl: './create-periode.component.html',
  styleUrls: ['./create-periode.component.css']
})
export class CreatePeriodeComponent implements OnInit {



  addPeriodeForm: FormGroup;
  periode = new PeriodeCreateDto();
  allDepartements = new Array<DepartementDto>();
  plant = new PlanteModeleUpdateDto();
  messageValidation = null;
  messageErreur = null;
  
  constructor(
    private servicePlante: PlanteModeleService,
    private servicePeriode: PeriodeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.addPeriodeForm = new FormGroup({
      "type": new FormControl(this.periode.periodType, Validators.required),
      "dateDebut": new FormControl(this.periode.startDate, Validators.required),
      "dateFin": new FormControl(this.periode.endDate, Validators.required),
      "dept": new FormControl(this.periode.county, Validators.required),
    });
  }

  get type() { return this.addPeriodeForm.get('type') }
  get planteModel() { return this.addPeriodeForm.get('planteModel') }
  get dateDebut() { return this.addPeriodeForm.get('dateDebut') }
  get dateFin() { return this.addPeriodeForm.get('dateFin') }
  get dept() { return this.addPeriodeForm.get('dept') }

  // Appel à la methode getPlant des le chargement de la page, en prenant compte la valeur de l'id dans l'url
  getPlant(): void {
    this.servicePlante.getId(+this.route.snapshot.paramMap.get('id')).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.plant = responsedto.body;
          this.periode.plantSpecies = this.plant;
        }
      }
    );
  }
  create() {
    this.servicePeriode.create(this.periode).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
        } else { this.messageErreur = responseDto.message; }
      }
    )
  }
}


