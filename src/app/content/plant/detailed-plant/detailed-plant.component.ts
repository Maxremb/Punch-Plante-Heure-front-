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
  idPlante:number;
  

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
      arrosage: new FormControl(this.plant.arrosage),
      ensoleillement: new FormControl(this.plant.ensoleillement),
      humidite: new FormControl(this.plant.humidite),
      sol: new FormControl(this.plant.sol),
      repiquage: new FormControl(this.plant.repiquage),
      min: new FormControl(this.plant.min),
      max: new FormControl(this.plant.max),
      desc: new FormControl(this.plant.desc),
      toxi: new FormControl(this.plant.toxi),
      positive: new FormControl(this.plant.positive),
      negative: new FormControl(this.plant.negative),
      mifa: new FormControl(this.plant.mifa),
      height: new FormControl(this.plant.height),
      feuille: new FormControl(this.plant.feuille),
      veget: new FormControl(this.plant.veget),
      picture: new FormControl(this.plant.picture),
    });
  }

  // Appel à la methode getPlant des le chargement de la page, en prenant compte la valeur de l'id dans l'url
  getPlant(): void {
    this.idPlante = +this.route.snapshot.paramMap.get('id');
    this.service.getId(this.idPlante).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
         
          this.plant = responsedto.body;
        }
      }
    );
  }
  

  updatePlante() {
    this.service.update(this.plant).subscribe(
      (responseDto) => {     
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! L\'examen a bien été modifié.';
          this.error = false;
        }
      },
      (error) => {
        this.messageValidation = 'ERREUR ! L\'examen n\'a pas été modifié.';
        this.error = true;
        }

    );
  }

  

}
