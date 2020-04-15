import { Component, OnInit, Input } from '@angular/core';
import { PeriodeService } from 'src/app/services/periode.service';
import { PeriodeCreateDto } from 'src/app/models/periode-create-dto';
import { DepartementDto } from 'src/app/models/departement-dto';
import { ActivatedRoute } from '@angular/router';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PeriodeEnum } from 'src/app/enums/periode-enum.enum'
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
  minDate = new Date(this.currentYear, 2, 5);
  maxDate = new Date(this.currentYear, 11, 31);
  debugMessage= "all periodes vide pour l'instant";
  
  constructor(
    private servicePeriode: PeriodeService) { }

  ngOnInit(): void {
    this.getPeriodes();
  }

  changeDateMin(){
    this.minDate = this.period.startDate;
    console.log('new min date')
  }
  changeDateMax(){
    this.maxDate = this.period.endDate;
    console.log('new max date')
  }

  create() {
    this.period.county = this.servicePeriode.departement;
    this.period.plantSpecies = this.servicePeriode.plante;
    console.log("Saving new periode : Departement : "+this.period.county.depNum+' ; Plante : '+this.period.plantSpecies.identifiant+' ; Type : '+this.period.periodType+' ; Debut : '+this.period.startDate+' ; Fin : '+this.period.endDate)
    this.servicePeriode.create(this.period).subscribe(
      (responseDto) => {
        this.messageValidation="La période a bien été enregistrée !";
        this.getPeriodes();
      },
      (error) => {
        this.messageErreur=error;
      }
    )
  }

  
  getPeriodes() {
    this.debugMessage = "En attente d'une reponse";
    console.log("getPeriod("+this.servicePeriode.departement.depNum+","+this.servicePeriode.plante.identifiant+")")
    this.servicePeriode.getAllTypes(this.servicePeriode.departement.depNum,this.servicePeriode.plante.identifiant).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allPeriodes = responseDto.body.content;
          this.debugMessage = 'allPeriodes remplies avec : '+this.allPeriodes;
        }
        else { 
          console.log('ERREUR IN RESPONSEDTO')
        }
      }
    );
  }

delete(id: number) {this.servicePeriode.delete(id).subscribe()}
}