import { Component, OnInit } from '@angular/core';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { PeriodeService } from 'src/app/services/periode.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-planning-jardin',
  templateUrl: './planning-jardin.component.html',
  styleUrls: ['./planning-jardin.component.css']
})
export class PlanningJardinComponent implements OnInit {

  allPlantes = new Array<PlanteUtilisateurUpdateDto>();

  constructor(
    private periodeService: PeriodeService,
    private planteUtilisateurService: PlanteUtilisateurService,
    private route: ActivatedRoute,
    private location: Location
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
    for (let p = 0; p < this.allPlantes.length; p++) {


    this.allPlantes[p].rempotage = [];
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
            }
          }
        )
    );
    
    this.allPlantes[p].floraison = [];
    this.allPlantes.forEach(plante =>
      this.periodeService.getByDepAndPlanteModelIdAndType(
        plante.garden.dept.depNum,
        plante.modelPlant.identifiant,
        'FLORAISON')
        .subscribe(
          (responseDto) => {
            if (!responseDto.error) {
              for (let i = 1; i < 13; i++) {
                if (Number.parseInt(responseDto.body.startDate.toString().split("-")[1]) > i || Number.parseInt(responseDto.body.endDate.toString().split("-")[1]) < i) {
                  plante.floraison.push("neutre");
                } else {
                  plante.floraison.push("floraison");
                }
              }
            }
          }
        )
    )

    this.allPlantes[p].semis = [];
    this.allPlantes.forEach(plante =>
      this.periodeService.getByDepAndPlanteModelIdAndType(
        plante.garden.dept.depNum,
        plante.modelPlant.identifiant,
        'SEMIS')
        .subscribe(
          (responseDto) => {
            if (!responseDto.error) {
              for (let i = 1; i < 13; i++) {
                if (Number.parseInt(responseDto.body.startDate.toString().split("-")[1]) > i || Number.parseInt(responseDto.body.endDate.toString().split("-")[1]) < i) {
                  plante.semis.push("neutre");
                } else {
                  plante.semis.push("semis");
                }
              }
            }
          }
        )
    )

    this.allPlantes[p].fructification = [];
    this.allPlantes.forEach(plante =>
      this.periodeService.getByDepAndPlanteModelIdAndType(
        plante.garden.dept.depNum,
        plante.modelPlant.identifiant,
        'FRUCTIFICATION')
        .subscribe(
          (responseDto) => {
            if (!responseDto.error) {
              for (let i = 1; i < 13; i++) {
                if (Number.parseInt(responseDto.body.startDate.toString().split("-")[1]) > i || Number.parseInt(responseDto.body.endDate.toString().split("-")[1]) < i) {
                  plante.fructification.push("neutre");
                } else {
                  plante.fructification.push("fructification");
                }
              }
            }
          }
        )
    )

    this.allPlantes[p].taille = [];
    this.allPlantes.forEach(plante =>
      this.periodeService.getByDepAndPlanteModelIdAndType(
        plante.garden.dept.depNum,
        plante.modelPlant.identifiant,
        'TAILLE')
        .subscribe(
          (responseDto) => {
            if (!responseDto.error) {
              for (let i = 1; i < 13; i++) {
                if (Number.parseInt(responseDto.body.startDate.toString().split("-")[1]) > i || Number.parseInt(responseDto.body.endDate.toString().split("-")[1]) < i) {
                  plante.taille.push("neutre");
                } else {
                  plante.taille.push("taille");
                }
              }
            }
          }
        )
    )
  }

  }
  retour(): void {
    this.location.back();
  }


}
