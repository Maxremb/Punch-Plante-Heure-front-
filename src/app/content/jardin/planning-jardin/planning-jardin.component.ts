import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PeriodeService } from 'src/app/services/periode.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { ActivatedRoute } from '@angular/router';
import { PeriodeEnum } from 'src/app/enums/periode-enum.enum';

@Component({
  selector: 'app-planning-jardin',
  templateUrl: './planning-jardin.component.html',
  styleUrls: ['./planning-jardin.component.css']
})
export class PlanningJardinComponent implements OnInit {

  allPlantes = new Array<PlanteUtilisateurUpdateDto>();
  planteActive = new PlanteUtilisateurUpdateDto();

  rempotage = new Array<String>();

  constructor(
    // private jardinservice: JardinService,
    private periodeService: PeriodeService,
    private planteUtilisateurService: PlanteUtilisateurService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getPlantes();
    this.getPeriodes();

  }

  getPlantes(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.planteUtilisateurService.getAllByJardin(id, 0).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.body.content;
          console.log(this.allPlantes[0].modelPlant.periodes);
          this.allPlantes.forEach(e =>
           
            e.modelPlant.periodes.forEach(p => {
              if (p.type == PeriodeEnum.REMPOTAGE && p.dept == e.garden.dept) {
                for (let i = 1; i < 13; i++) {
                  if (p.dateDebut.getMonth() < i && p.dateFin.getMonth() > i) {
                    e.rempotage.push("neutre");
                  } else {
                    e.rempotage.push("rempotage");
                  }
                }
              }
            }
            )
          )
        }
      }
    )
  }

  getPeriodes() : void {
    this.allPlantes.forEach(p=> this.periodeService.getByDepAndPlanteModelIdAndType
      )
  }


}
