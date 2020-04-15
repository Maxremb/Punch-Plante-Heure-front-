import { Component, OnInit, Input } from '@angular/core';
import { PeriodeService } from 'src/app/services/periode.service';
import { PeriodeCreateDto } from 'src/app/models/periode-create-dto';
import { PeriodeUpdateDto } from 'src/app/models/periode-update-dto';


@Component({
  selector: 'app-create-periode',
  templateUrl: './create-periode.component.html',
  styleUrls: ['./create-periode.component.css']
})
export class CreatePeriodeComponent implements OnInit {
  allPeriodes= new Array<PeriodeUpdateDto>();
  period = new PeriodeCreateDto();
  plante = this.servicePeriode.plante;
  departement = this.servicePeriode.departement;
  messageValidation = '';
  messageErreur = '';
  currentYear = new Date().getFullYear();
  minDate = new Date(this.currentYear, 0, 1);
  maxDate = new Date(this.currentYear, 11, 31);
  
  constructor(
    private servicePeriode: PeriodeService) { }

  ngOnInit(): void {
    this.getPeriodes();
  }

  changeDateMin(){
    this.minDate = this.period.startDate;
  }
  changeDateMax(){
    this.maxDate = this.period.endDate;
  }

  create() {
    this.period.county = this.servicePeriode.departement;
    this.period.plantSpecies = this.servicePeriode.plante;
    // console.log("Saving new periode : Departement : "+this.period.county.depNum+' ; Plante : '+this.period.plantSpecies.identifiant+' ; Type : '+this.period.periodType+' ; Debut : '+this.period.startDate+' ; Fin : '+this.period.endDate)
    this.servicePeriode.create(this.period).subscribe(
      (responseDto) => {
        this.messageValidation="La période a bien été enregistrée !";
        this.getPeriodes();
        this.minDate = new Date(this.currentYear, 0, 1);
        this.maxDate = new Date(this.currentYear, 11, 31)
      },
      (error) => {
        this.messageErreur=error;
      }
    )
  }

  
  getPeriodes() {
    this.servicePeriode.getAllTypes(this.servicePeriode.departement.depNum,this.servicePeriode.plante.identifiant).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allPeriodes = responseDto.body;
        }
      }
    );
  }

delete(id: number) {this.servicePeriode.delete(id).subscribe(
  (responseDto) => {
  this.getPeriodes()
})
}


}