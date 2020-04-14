import { Component, OnInit } from '@angular/core';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-gestion-admin',
  templateUrl: './gestion-admin.component.html',
  styleUrls: ['./gestion-admin.component.css']
})
export class GestionAdminComponent implements OnInit {


    allUtilisateur = new Array<UtilisateurUpdateDto>();
    singleUtilisateur = new UtilisateurUpdateDto();
    pageActive:number =0;
    maxPage:number=0;
    pageTotal:number[]=[];
    keyWord: string;
    liste: boolean;
    choix: boolean;
    recherche: boolean;
    identifier: number;
    single: boolean;
    numero: number;
    message: string;

    constructor(private service: UtilisateurService) { }

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
    }

    // Methode pour afficher la liste des utilisateurs, appel a la methode getAll(1)
    afficherListe() {
      this.liste = true;
      this.choix = false;
      this.getAll(0);
    }

    // Methode pour afficher le champ de recherche par ID
    afficherRecherche() {
      this.recherche = true;
      this.choix = false;
    }

    // Methode pour afficher le tableau avec SINGLE
    afficherSingle(numero: number) {
      this.recherche = true;
      this.choix = false;
      this.single = true;
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
          console.log('debug responseDto : ', responseDto);
          if (!responseDto.error) {
            this.allUtilisateur = responseDto.body.content;
            this.pageActive = responseDto.body.number;
            this.maxPage = responseDto.body.totalPages;
            this.pageTotal = this.range(this.pageActive,this.maxPage);
          }
        }
      );
    }

    getSingle(numero: number) {
      this.service.getUtilisateur(this.numero).subscribe(
        (responseDto) => {
          console.log('debug responseDto :', responseDto);
          if (!responseDto.error) {
            this.singleUtilisateur = responseDto.body;
          }
        }
      )
    }


    desactivateUser(identifier: number) {
      this.service.desactivateUser(identifier).subscribe(
        (responseDto) => {
            if (!responseDto.error) {
                  if (this.liste) {
                    this.getAll(0);
                  }
                  else if (this.single) {
                    this.getSingle(identifier);
                  }
            }
        }
      );
        
    }

    activateUser(identifier: number) {
      this.service.activateUser(identifier).subscribe(
        (responseDto) => {
          if (!responseDto.error) {
                if (this.liste) {
                  this.getAll(0);
                }
                else if (this.single) {
                  this.getSingle(identifier);
                }
          }
      }

      );
    }




  }
