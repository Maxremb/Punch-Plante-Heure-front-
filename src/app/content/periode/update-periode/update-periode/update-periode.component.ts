import { Component, OnInit } from '@angular/core';
import { PeriodeUpdateDto } from 'src/app/models/periode-update-dto';
import { PeriodeService } from 'src/app/services/periode.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseDto } from 'src/app/models/response-dto';
import { PlanteModeleListe } from 'src/app/models/plante-modele-liste';
import { DepartementDto } from 'src/app/models/departement-dto';

@Component({
  selector: 'app-update-periode',
  templateUrl: './update-periode.component.html',
  styleUrls: ['./update-periode.component.css']
})

export class UpdatePeriodeComponent implements OnInit {

  constructor(private service : PeriodeService) { }

  periode = new PeriodeUpdateDto;
  updatePeriodeForm : FormGroup;
  allPlantes = new PlanteModeleListe;
  allDepartements = new DepartementDto;
  messageValidation = null;
  messageEchec = null;


  ngOnInit(): void {
    this.periode = this.service.periode;
    this.updatePeriodeForm = new FormGroup({
      "type": new FormControl(this.periode.type),
      "dateDebut" : new FormControl(this.periode.dateDebut),
      "dateFin" : new FormControl(this.periode.dateFin),
      "dept": new FormControl(this.periode.dept),
      "planteModel" : new FormControl(this.periode.planteModel)
    })
  }

  update() {
    this.service.update(this.periode).subscribe(
      responseDto => { this.messageValidation = responseDto.message;},
      responseDto => { this.messageEchec = responseDto.message;}
    )
  }
}
