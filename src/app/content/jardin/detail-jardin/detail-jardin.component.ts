import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';


@Component({
  selector: 'app-detail-jardin',
  templateUrl: './detail-jardin.component.html',
  styleUrls: ['./detail-jardin.component.css']
})
export class DetailJardinComponent implements OnInit {

  jardin: JardinUpdateDto;
  plantesParJardin = new Array<PlanteUtilisateurUpdateDto>();
  emptyliste: boolean = false;
  nombre: number;
  messageValidation: string;
  messageEchec: string;
  
  constructor(
    private jardinservice: JardinService,
    private planteutilisateurservice: PlanteUtilisateurService,
  ) { }

  // Valeurs a initialiser
  ngOnInit(): void {
    // recuperation de la variable jardin "stockée"
    this.jardin = this.jardinservice.jardin;
    // recuperation des plantes utilisateurs dans ce jardin
    this.getPlantesParJardin(this.jardin.identifier);
      
  }

  // recuperation des plantes utilisateurs dans ce jardin
  getPlantesParJardin(id: number): void {
    this.planteutilisateurservice.getAllByJardin(id,0).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesParJardin = responseDto.body;
          if (this.plantesParJardin.length==0) {
            this.emptyliste = true;
          }
          else {
            this.emptyliste = false;
            this.nombre = this.plantesParJardin.length;
          }
        }
      }
    );
  }

  // suppression de la plante utilisateur numero ... + rechargement de la page
  supprimer(id: number): void {
    this.planteutilisateurservice.delete(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesParJardin = this.plantesParJardin.filter(element =>  element.identifiant !== id);
          document.location.reload();
        }
      }
    );
  }

  // enregistrement de la planteutilisateur a modifier dans la variable planteUtilisateur
  stockagePlanteUtilisateur(planteUtilisateur : PlanteUtilisateurUpdateDto) {
    this.planteutilisateurservice.planteUtilisateur = planteUtilisateur ;
  }

}
