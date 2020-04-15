import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PeriodeUpdateDto } from 'src/app/models/periode-update-dto';
import { PeriodeService } from 'src/app/services/periode.service';

// On déclare la fonction javascript comprenant du JQuery
declare function maFonction():any;

@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.css']
})
export class CreatePlantComponent implements OnInit {
  
  plantCreateForm: FormGroup;
  plant = new PlanteModeleCreateDto();
  messageValidation = '';
  error:boolean;
  
  

  constructor(private service: PlanteModeleService) { }

  ngOnInit(): void {
    maFonction(); // on lance la fonction js pour pouvoir l'appeler et l'utiliser dans le fichier html
    this.plantCreateForm = new FormGroup({
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
      positive: new FormControl(this.plant.positive,Validators.required),
      negative: new FormControl(this.plant.negative,Validators.required),
      mifa: new FormControl(this.plant.mifa,Validators.required),
      height: new FormControl(this.plant.height,Validators.required),
      feuille: new FormControl(this.plant.feuille,Validators.required),
      veget: new FormControl(this.plant.veget,Validators.required),
      picture: new FormControl(this.plant.picture,Validators.required),
     });
  }

  save() {
    this.service.create(this.plant).subscribe(
      (responseDto) => {
       
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! La plante a bien été ajoutée à la base de données';
          this.error = false;
        }
      },
      (error) => {
       
        if (error.error) {
        this.messageValidation = 'ERREUR ! La plante n\'a pas été ajoutée à la base de données';
        this.error = true;
        }
      }
    );
  }

 

}
