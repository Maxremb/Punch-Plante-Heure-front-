import { Component, OnInit } from '@angular/core';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
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


  constructor(
    // private jardinservice: JardinService,
    private periodeService: PeriodeService,
    private planteUtilisateurService: PlanteUtilisateurService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getPlantes();


  }

  getPlantes(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.planteUtilisateurService.getAllByJardin(id, 0).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.body.content;
          this.getPeriodes();
        }
      }
    );
  }

  getPeriodes(): void {
    this.allPlantes[0].rempotage = [];
    this.allPlantes.forEach(plante =>
      this.periodeService.getByDepAndPlanteModelIdAndType(
        plante.garden.dept.depNum,
        plante.modelPlant.identifiant,
        'REMPOTAGE')
        .subscribe(
          (responseDto) => {

            if (!responseDto.error) {

              for (let i = 1; i < 13; i++) {
                if (Number.parseInt(responseDto.body.startDate.toString().split("-")[1]) > i || Number.parseInt(responseDto.body.endDate.toString().split("-")[1]) < i) {
                  plante.rempotage.push("neutre");
                } else {
                  plante.rempotage.push("rempotage");
                }
              }
              console.log(plante.rempotage);

            }
          }
        )
    )
  }


}
