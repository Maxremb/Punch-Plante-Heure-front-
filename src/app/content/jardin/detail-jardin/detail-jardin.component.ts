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

  ngOnInit(): void {
    this.jardin = this.jardinservice.jardin;
    this.getPlantesParJardin(this.jardin.identifier);
      
  }

  getPlantesParJardin(id: number): void {
    this.planteutilisateurservice.getAllByJardin(id).subscribe(
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

  stockagePlanteUtilisateur(planteUtilisateur : PlanteUtilisateurUpdateDto) {
    this.planteutilisateurservice.planteUtilisateur = planteUtilisateur ;
  }

}
