import { Component, OnInit } from '@angular/core';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { PeriodeService } from 'src/app/services/periode.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PeriodeUpdateDto } from 'src/app/models/periode-update-dto';
import { PeriodeEnum } from 'src/app/enums/periode-enum.enum';

@Component({
  selector: 'app-planning-jardin',
  templateUrl: './planning-jardin.component.html',
  styleUrls: ['./planning-jardin.component.css']
})
export class PlanningJardinComponent implements OnInit {
  allPlanteLave = new Array<PlanteUtilisateurUpdateDto>();
  allPlantes = new Array<PlanteUtilisateurUpdateDto>();
  jardin: JardinUpdateDto;
  allPeriodes: Array<PeriodeUpdateDto>;
  fini: boolean= false;

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
    this.planteUtilisateurService.getAllByJardinListe(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.body;
          this.allPlantes.forEach(p => {
            if (this.allPlanteLave.indexOf(p) == -1) {
              this.allPlanteLave.push(p);
            }
          }
          )
          console.log(this.allPlanteLave);
          this.jardin = this.allPlantes[0].garden;
          this.getPeriodes();
        }
      }
    );
  }

  getPeriodes(): void {

    this.periodeService.getByJardin(this.jardin.dept.depNum, this.jardin.identifier)
      .subscribe(
        (responseDto) => {
          this.allPeriodes = responseDto.body;
          console.log(this.allPeriodes);

          this.allPlanteLave.forEach(plante => {
            console.log('plante en cours de traitement',plante);
            plante.rempotage = [];
            plante.taille = [];
            plante.floraison = [];
            plante.fructification = [];
            plante.semis = [];
            this.allPeriodes.forEach(periode => {
              if (periode.plantSpecies.identifiant == plante.modelPlant.identifiant){
               if(periode.periodType == PeriodeEnum.REMPOTAGE) {
                  for (let i = 1; i < 13; i++) {
                    if (Number.parseInt(periode.startDate.toString().split("-")[1]) > i || Number.parseInt(periode.endDate.toString().split("-")[1]) < i) {
                      plante.rempotage.push("neutre");
                    } else {
                      plante.rempotage.push("rempotage");
                    }
                    
                  }
                }else if(periode.periodType == PeriodeEnum.TAILLE) {
                  for (let i = 1; i < 13; i++) {
                    if (Number.parseInt(periode.startDate.toString().split("-")[1]) > i || Number.parseInt(periode.endDate.toString().split("-")[1]) < i) {
                      plante.taille.push("neutre");
                    } else {
                      plante.taille.push("taille");
                    }
                  }
                }else if(periode.periodType == PeriodeEnum.FLORAISON) {
                  for (let i = 1; i < 13; i++) {
                    if (Number.parseInt(periode.startDate.toString().split("-")[1]) > i || Number.parseInt(periode.endDate.toString().split("-")[1]) < i) {
                      plante.floraison.push("neutre");
                    } else {
                      plante.floraison.push("floraison");
                    }
                  }
                }else if(periode.periodType == PeriodeEnum.FRUCTIFICATION) {
                  for (let i = 1; i < 13; i++) {
                    if (Number.parseInt(periode.startDate.toString().split("-")[1]) > i || Number.parseInt(periode.endDate.toString().split("-")[1]) < i) {
                      plante.fructification.push("neutre");
                    } else {
                      plante.fructification.push("fructification");
                    }
                  }
                }else if(periode.periodType == PeriodeEnum.SEMIS) {
                  for (let i = 1; i < 13; i++) {
                    if (Number.parseInt(periode.startDate.toString().split("-")[1]) > i || Number.parseInt(periode.endDate.toString().split("-")[1]) < i) {
                      plante.semis.push("neutre");
                    } else {
                      plante.semis.push("semis");
                    }
                  }
                }
              } 
            }
            )

            

          })
          this.fini=true;}
        
        )
  }




  retour(): void {
    this.location.back();
  }


}
