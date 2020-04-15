import { Component, OnInit } from '@angular/core';
import { PeriodeService } from 'src/app/services/periode.service';
import { PeriodeUpdateDto } from 'src/app/models/periode-update-dto';
import { DepartementDto } from 'src/app/models/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-periode',
  templateUrl: './all-periode.component.html',
  styleUrls: ['./all-periode.component.css']
})
export class AllPeriodeComponent implements OnInit {

  allPeriodes : Array<PeriodeUpdateDto>;
  periode = new PeriodeUpdateDto;
  maxpagePeriode:number;
  maxpageDept:number;
  messageRecherche='';
  pageActive = 0;
  pageTotal:number[]=[];
  departements= new Array<DepartementDto>();
  idPlante:number;
  idDept:number=0;
  plante: PlanteModeleUpdateDto = new PlanteModeleUpdateDto();

  constructor(private servicePlante: PlanteModeleService,
    private serviceDept: DepartementService,
    private servicePeriode : PeriodeService,
    private route: ActivatedRoute ){ }

  ngOnInit(): void {
    // this.getPlant();
    this.plante = this.servicePeriode.plante;
    this.getDepartements(0);
  }


  range(pactif,ptotal) {
    if(ptotal>5){
      if(pactif<3) return (new Array(5)).fill(undefined).map((_, i) => i);
      else if(pactif>2 && pactif<ptotal-2) return (new Array(5)).fill(undefined).map((_, i) => i+pactif-2);
      else return (new Array(5)).fill(undefined).map((_, i) => i+ptotal-5);
    }else{
      return (new Array(ptotal)).fill(undefined).map((_, i) => i);
    }
  }
  // Appel à la methode getPlant des le chargement de la page, en prenant compte la valeur de l'id dans l'url
  getPlant(): void {
    this.idPlante = +this.route.snapshot.paramMap.get('id');
    this.servicePlante.getId(this.idPlante).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.plante = responsedto.body;
        }
      }
    );
  }

  getDepartements(page:number) {
    this.serviceDept.getAllAdmin(page).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.departements = responseDto.body.content;
          this.maxpageDept= responseDto.body.totalPages;
          this.pageActive = responseDto.body.number;
          this.pageTotal = this.range(this.pageActive,this.maxpageDept);
          if(this.allPeriodes==[]) this.messageRecherche='Cette plante ne possède pas encore de période.';
        }
        else { 
          this.messageRecherche = 'ERREUR !';
        }
      }
    );
    }

  getPeriodes(idDe:number) {
    this.servicePeriode.getAllTypes(idDe,this.idPlante).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allPeriodes = responseDto.body;
          if(this.allPeriodes==[]) {
            this.allPeriodes = new Array<PeriodeUpdateDto>();
            this.messageRecherche='Cette plante ne possède pas encore de période.';
          }
        }
        else { 
          this.messageRecherche = 'ERREUR !'
        }
      }
    );
  }

  delete(id: number) {
    this.servicePeriode.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allPeriodes = this.allPeriodes.filter(
            element => element.identity !== id
          );
        }
      }
    )
  }

  // permet d'envoyer la periode vers la page update à travers le service
  stockagePeriode(period : PeriodeUpdateDto) {
  this.servicePeriode.periode = period ;
  }
  
  stockageDepartement(dep : DepartementDto) {
  this.servicePeriode.departement = dep ;
  }

}
