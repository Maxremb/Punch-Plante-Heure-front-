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
  pageActive: number = 1;
  pageTotal: number[];
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


  range(end) {
    return (new Array(end)).fill(undefined).map((_, i) => i);
  }

  getAll(nbpage: number) {
    this.service.getAllAdmin(nbpage).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allDepartements = responseDto.body.content;
          this.pageActive = responseDto.body.number;
          this.pageTotal = this.range(responseDto.body.totalPages);
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
