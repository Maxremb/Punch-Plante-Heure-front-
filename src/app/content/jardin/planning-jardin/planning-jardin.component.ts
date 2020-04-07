import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';

@Component({
  selector: 'app-planning-jardin',
  templateUrl: './planning-jardin.component.html',
  styleUrls: ['./planning-jardin.component.css']
})
export class PlanningJardinComponent implements OnInit {

  // jardin: JardinUpdateDto;
  // plantesParJardin = new Array<PlanteUtilisateurUpdateDto>();
  // emptyliste: boolean = false;
  // nombre: number;
  
  constructor(
    // private jardinservice: JardinService,
    // private planteutilisateurservice: PlanteUtilisateurService,
  ) { }

  // Valeurs a initialiser
  ngOnInit(): void {
    // recuperation de la variable jardin "stockée"
    // this.jardin = this.jardinservice.jardin;
    // recuperation des plantes utilisateurs dans ce jardin
    // this.getPlantesParJardin(this.jardin.identifier);
    // console.log(this.plantesParJardin);
  }

  // recuperation des plantes utilisateurs dans ce jardin
  // getPlantesParJardin(id: number): void {
  //   this.planteutilisateurservice.getAllByJardin(id).subscribe(
  //     (responseDto) => {
  //       if (!responseDto.error) {
  //         this.plantesParJardin = responseDto.body;
  //         if (this.plantesParJardin.length==0) {
  //           this.emptyliste = true;
  //         }
  //         else {
  //           this.emptyliste = false;
  //           this.nombre = this.plantesParJardin.length;
  //         }
  //       }
  //     }
  //   );
  // }


}
