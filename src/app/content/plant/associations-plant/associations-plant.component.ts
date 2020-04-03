import { Component, OnInit } from '@angular/core';
import { PLANTSMODEL } from '../../../mock-plants';

@Component({
  selector: 'app-associations-plant',
  templateUrl: './associations-plant.component.html',
  styleUrls: ['./associations-plant.component.css']
})
export class AssociationsPlantComponent implements OnInit {

  allPlant = PLANTSMODEL;

  constructor() { }

  ngOnInit(): void {
  }
  

}
