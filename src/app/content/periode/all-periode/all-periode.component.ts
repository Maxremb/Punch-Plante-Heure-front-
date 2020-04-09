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

  allPeriodes = new Array<PeriodeUpdateDto>();
  periode = new PeriodeUpdateDto;
  maxpagePeriode=100000;
  messageRecherche='';
  departement: DepartementDto = new DepartementDto();
  plante: PlanteModeleUpdateDto = new PlanteModeleUpdateDto();

  constructor(private servicePlante: PlanteModeleService,
    private serviceDept: DepartementService,
    private servicePeriode : PeriodeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPlant();
    this.getPeriodesByPlante();
  }
  // Appel à la methode getPlant des le chargement de la page, en prenant compte la valeur de l'id dans l'url
  getPlant(): void {
    this.servicePlante.getId(+this.route.snapshot.paramMap.get('id')).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.plante = responsedto.body;
          this.periode.plantSpecies = this.plante;
        }
      }
    );
  }
  getPeriodesByPlante() {
    if(this.messageRecherche==''){
    this.allPeriodes = []
    this.maxpagePeriode = 1000000;
    var page=0; 
    for(;page<this.maxpagePeriode;){
    this.servicePeriode.getAllByPlante(this.plante.identifiant,page).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allPeriodes.push(responseDto.body.content);
          this.maxpagePeriode= responseDto.body.totalPages;
          page++;
          if(this.allPeriodes==[]) this.messageRecherche='Cette plante ne possède pas encore de période.';
        }
        else { 
          this.messageRecherche = 'ERREUR !'
          this.maxpagePeriode=0;
        
        }
      }
    );
    }
  }
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
}
