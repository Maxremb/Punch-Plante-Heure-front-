import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PeriodeService } from 'src/app/services/periode.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planning-jardin',
  templateUrl: './planning-jardin.component.html',
  styleUrls: ['./planning-jardin.component.css']
})
export class PlanningJardinComponent implements OnInit {

  allPlantes = new Array<PlanteUtilisateurUpdateDto>();
  planteActive = new PlanteUtilisateurUpdateDto();

  constructor(
    // private jardinservice: JardinService,
    // private periodeService: PeriodeService,
    private planteUtilisateurService: PlanteUtilisateurService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getPlantes();
  }

  getPlantes(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planteUtilisateurService.getAllByJardin(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.body;
          this.planteActive.modelPlant.
          // if (this.plantesParJardin.length==0) {
          //   this.emptyliste = true;
          // }  else {
          //     this.emptyliste = false;
          //     this.nombre = this.plantesParJardin.length;
          //   }
        }
      }
    );
  }

  // getPeriodes(plante: PlanteUtilisateurUpdateDto) : void {
  //   this.periodeService.getAllTypes(this.planteActive.garden.dept.depNum, this.planteActive.modelPlant.identifiant).subscribe(

  //   )
  // }


}
