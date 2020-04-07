import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { ActivatedRoute } from '@angular/router';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

declare function maFonction():any;

@Component({
  selector: 'app-detailed-plant',
  templateUrl: './detailed-plant.component.html',
  styleUrls: ['./detailed-plant.component.css']
})
export class DetailedPlantComponent implements OnInit {
  
  plantUpdateForm: FormGroup;
  plant: PlanteModeleUpdateDto = new PlanteModeleUpdateDto();
  messageValidation = '';
  error: boolean;

  constructor(
    private service: PlanteModeleService,
    private route: ActivatedRoute
    ) { }

  // Initialisation du formulaire et de l'appel à getPlant
  ngOnInit(): void {
    maFonction();
    this.getPlant();
    this.plantUpdateForm = new FormGroup({
      commun: new FormControl(this.plant.commun,Validators.required),
      scientifique: new FormControl(this.plant.scientifique,Validators.required),
      arrosage: new FormControl(this.plant.arrosage,Validators.required),
      ensoleillement: new FormControl(this.plant.ensoleillement,Validators.required),
      humidite: new FormControl(this.plant.humidite,Validators.required),
      sol: new FormControl(this.plant.sol,Validators.required),
      repiquage: new FormControl(this.plant.repiquage,Validators.required),
      min: new FormControl(this.plant.min,Validators.required),
      max: new FormControl(this.plant.max,Validators.required),
      desc: new FormControl(this.plant.desc,Validators.required),
      toxi: new FormControl(this.plant.toxi,Validators.required),
      assoPlus: new FormControl(this.plant.assoPlus,Validators.required),
      assoMoins: new FormControl(this.plant.assoMoins,Validators.required),
      surfaceAuSol: new FormControl(this.plant.surfaceAuSol,Validators.required),
      famille: new FormControl(this.plant.famille,Validators.required),
      hight: new FormControl(this.plant.hight,Validators.required),
      pousseSousTerre: new FormControl(this.plant.pousseSousTerre,Validators.required),
      grimpant: new FormControl(this.plant.grimpant,Validators.required),
      profondeurRacine: new FormControl(this.plant.profondeurRacine,Validators.required),
      strate: new FormControl(this.plant.strate,Validators.required),
      vivacite: new FormControl(this.plant.vivacite,Validators.required),
      picture: new FormControl(this.plant.picture,Validators.required),
    });
  }

  // Appel à la methode getPlant des le chargement de la page, en prenant compte la valeur de l'id dans l'url
  getPlant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getId(id).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          console.log('get data')
          this.plant = responsedto.body;
        }
      }
    );
  }

  update() {
    this.service.update(this.plant).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! L\'examen a bien été modifié.';
          this.error = false;
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! L\'examen n\'a pas été modifié.';
        this.error = true;
        }

    );
  }

}
