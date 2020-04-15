import { Component, OnInit } from '@angular/core';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PeriodeService } from 'src/app/services/periode.service';
import { DepartementService } from 'src/app/services/departement.service';
import { DepartementDto } from 'src/app/models/departement-dto';

@Component({
  selector: 'app-all-plant',
  templateUrl: './all-plant.component.html',
  styleUrls: ['./all-plant.component.css']
})
export class AllPlantComponent implements OnInit {

  allPlant = new Array<PlanteModeleUpdateDto>();
  singlePlant: PlanteModeleUpdateDto = new PlanteModeleUpdateDto();
  pageActive:number =0;
  maxPage:number=0;
  pageTotal:number[]=[];
  keyWord: string;
  liste: boolean;
  choix: boolean;
  recherche: boolean;
  numero: number;
  messageRecherche: string;
  departements: Array<DepartementDto>;
  single: boolean;


  constructor(private service:PlanteModeleService,
    private servicePeriode:PeriodeService,
    private serviceDept: DepartementService) { }

  // Initialisation des constantes choix, liste et recherche
  ngOnInit(): void {
    this.choix = true;
    this.liste = false;
    this.recherche = false;
    this.single = false;
  }

  // Methode pour afficher les choix de l'administrateur
  afficherChoix() {
    this.choix = true;
    this.liste = false;
    this.recherche = false;
    this.single = false;
  }
  
  // Methode pour afficher la liste des plantes, appel a la methode getAll(1)
  afficherListe() {
    this.liste = true;
    this.choix = false;
    this.recherche = false;
    this.single = false;
    this.getAll(0);
  }

  // Methode pour afficher le champ de recherche par ID
  afficherRecherche() {
    this.recherche = true;
    this.choix = false;
    this.single = false;
    this.liste = false;
  }

  // Methode pour afficher le tableau avec SINGLE
  afficherSingle(numero: number) {
    this.recherche = true;
    this.choix = false;
    this.single = true;
    this.liste = false;
    this.getSingle(numero);
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

  getAll(npage: number) {
    this.service.getAll(npage).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlant = responseDto.body.content;
          this.pageActive = responseDto.body.number;
          this.maxPage = responseDto.body.totalPages;
          this.pageTotal = this.range(this.pageActive,this.maxPage);
        }
      }
    );
  }

  getSingle(numero: number) {
    this.service.getId(this.numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.singlePlant = responseDto.body;
        }
      }
    )
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allPlant = this.allPlant.filter(
            element =>  element.identifiant !== id
          );
        }
      }
    );
  }
  getDepartements(page:number) {
    this.serviceDept.getAllAdmin(page).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.departements = responseDto.body.content;
          if(this.departements==[]) this.messageRecherche='Cette plante ne possède pas encore de période.';
        }
        else { 
          this.messageRecherche = 'ERREUR !';
         
        }
      }
    );
    }
    // permet d'envoyer la periode vers la page update à travers le service
    stockagePlante(plante : PlanteModeleUpdateDto) {
    this.servicePeriode.plante = plante ;
    }

  

  

}
