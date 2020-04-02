import { Component, OnInit } from '@angular/core';
import { PeriodeService } from 'src/app/services/periode.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeriodeCreateDto } from 'src/app/models/periode-create-dto';
import { PlanteModeleListe } from 'src/app/models/plante-modele-liste';
import { DepartementCreateDto } from 'src/app/models/departement-create-dto';

@Component({
  selector: 'app-create-periode',
  templateUrl: './create-periode.component.html',
  styleUrls: ['./create-periode.component.css']
})
export class CreatePeriodeComponent implements OnInit {

  constructor(private service: PeriodeService) { }

  addPeriodeForm: FormGroup;
  periode = new PeriodeCreateDto;
  allPlantes = new PlanteModeleListe;
  allDepartements = new DepartementCreateDto;
  messageValidation = null;
  messageErreur = null;

  ngOnInit(): void {
    this.addPeriodeForm = new FormGroup({
      "type": new FormControl(this.periode.type, Validators.required),
      "planteModel": new FormControl(this.periode.planteModel, Validators.required),
      "dateDebut": new FormControl(this.periode.dateDebut, Validators.required),
      "dateFin": new FormControl(this.periode.dateFin, Validators.required),
      "dept": new FormControl(this.periode.dept, Validators.required),
    })
  }

  get type() { return this.addPeriodeForm.get('type') }
  get planteModel() { return this.addPeriodeForm.get('planteModel') }
  get dateDebut() { return this.addPeriodeForm.get('dateDebut') }
  get dateFin() { return this.addPeriodeForm.get('dateFin') }
  get dept() { return this.addPeriodeForm.get('dept') }


  create() {
    this.service.create(this.periode).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
        } else { this.messageErreur = responseDto.message; }
      }
    )
  }
}


