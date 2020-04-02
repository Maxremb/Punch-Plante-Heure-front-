import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { modelPlantCreateDto } from 'src/app/models/plante-modele-create-dto';
import { modelPlantService } from 'src/app/services/plante-modele-service.service';

@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.css']
})
export class CreatePlantComponent implements OnInit {
  plantCreateForm: FormGroup;

  plant = new modelPlantCreateDto();
  messageValidation = '';
  error:boolean;

  constructor(private service: modelPlantService) { }

  ngOnInit(): void {
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
