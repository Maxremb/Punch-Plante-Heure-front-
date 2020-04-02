import { Component, OnInit, Input } from '@angular/core';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { ActivatedRoute } from '@angular/router';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

@Component({
  selector: 'app-userview-detailed-plant',
  templateUrl: './userview-detailed-plant.component.html',
  styleUrls: ['./userview-detailed-plant.component.css']
})
export class UserviewDetailedPlantComponent implements OnInit {
    @Input() plant: PlanteModeleUpdateDto;
    messageValidation = '';
    error:boolean;
  
    constructor(private service: PlanteModeleService,
      private route: ActivatedRoute,) { }
  
    ngOnInit(): void {    }

    getPlant(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.service.getId(id)
        .subscribe(responsedto => this.plant = responsedto.body);
    }  
  }
