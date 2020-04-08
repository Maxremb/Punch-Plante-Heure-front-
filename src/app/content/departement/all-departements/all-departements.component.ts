import { Component, OnInit } from '@angular/core';
import { DepartementDto } from 'src/app/models/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';
import { MeteoUpdateDto } from 'src/app/models/meteo-update-dto';


@Component({
  selector: 'app-all-departements',
  templateUrl: './all-departements.component.html',
  styleUrls: ['./all-departements.component.css']
})
export class AllDepartementsComponent implements OnInit {

  allDepartements = new Array<DepartementDto>();
  pageActive: number = 0;
  pageTotal: number[];
  maxPage:number=0;
  liste: boolean;
  choix: boolean;
  recherche: boolean;
  recherche1: boolean;
  depNum: number;
  name: string;
  departement: DepartementDto;
  afficherDep: boolean;
  

  constructor(private service: DepartementService) { }

  ngOnInit(): void {
    this.choix = true;
    this.liste = false;
    this.recherche = false;
    this.recherche1 = false;
    this.afficherDep = false;
  }

  // Methode pour afficher les choix de l'administrateur
  afficherChoix() {
    this.choix = true;
    this.liste = false;
    this.recherche = false;
    this.recherche1 = false;
    this.afficherDep = false;

  }

  // Methode pour afficher le champ de recherche par ID
  afficherRecherche() {
    this.recherche = true;
    this.choix = false;
  }

  // Methode pour afficher le champ de recherche par ID
  afficherRecherche1() {
    this.recherche1 = true;
    this.choix = false;

  }

  // Methode pour afficher la liste des plantes, appel a la methode getAll(1)
  afficherListe() {
    this.liste = true;
    this.choix = false;
    this.getAll(0);

  }

  afficherDepartement() {
    this.choix=false;
    this.recherche = false;
    this.recherche1 = false;
    if (this.name != null) {
      this.service.getByName(this.name).subscribe(
        (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.departement = responseDto.body;
          this.afficherDep = true;

         
        }
      });
    } else if (this.depNum != null) {
      this.service.getById(this.depNum).subscribe(
        (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.departement = responseDto.body;
          this.afficherDep = true;
        }
      });
    }
    
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

  getAll(nbpage: number) {
    this.service.getAllAdmin(nbpage).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allDepartements = responseDto.body.content;
          this.pageActive = responseDto.body.number;
          this.maxPage = responseDto.body.totalPages;
          this.pageTotal = this.range(this.pageActive,this.maxPage);
        }
      }
    );

  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allDepartements = this.allDepartements.filter(
            element => element.depNum !== id
          );
        }
      }
    );
  }

}
