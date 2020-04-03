import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';

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
      famille: new FormControl(this.plant.famille,Validators.required),
      arrosage: new FormControl(this.plant.arrosage,Validators.required),
      ensoleillement: new FormControl(this.plant.ensoleillement,Validators.required),
      humidite: new FormControl(this.plant.humidite,Validators.required),
      sol: new FormControl(this.plant.sol,Validators.required),
      repiquage: new FormControl(this.plant.repiquage,Validators.required),
      min: new FormControl(this.plant.min,Validators.required),
      max: new FormControl(this.plant.max,Validators.required),
      desc: new FormControl(this.plant.desc,Validators.required),
      toxi: new FormControl(this.plant.toxi,Validators.required),
      assoplus: new FormControl(this.plant.assoplus,Validators.required),
      assomoins: new FormControl(this.plant.assomoins,Validators.required),
      picture: new FormControl(this.plant.picture,Validators.required),
    });
  }

  save() {
    this.service.create(this.plant).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! La plante a bien été ajouté à la DB';
          this.error = false;
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! La plante n\'a pas été ajouté à la DB';
        this.error = true;
        }

    );
  }

}
