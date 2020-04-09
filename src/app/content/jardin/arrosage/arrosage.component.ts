import { Component, OnInit } from '@angular/core';
import { JardinCreateDto } from 'src/app/models/jardin-create-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';

declare function maFonction1():any;
@Component({
  selector: 'app-arrosage',
  templateUrl: './arrosage.component.html',
  styleUrls: ['./arrosage.component.css']
})
export class ArrosageComponent implements OnInit {

  jardin : JardinUpdateDto
  afficher : boolean = false

  constructor(
    private jardinservice: JardinService,
  ) {}

  ngOnInit(): void {
    this.getJardin();
    maFonction1();

  }
//  getValeur(){
//    this.jardin.usefullReserve = 50;

//  }
 getJardin(){
  this.jardin= new JardinUpdateDto();
  this.jardin.identifier=1;
  this.jardin.usefullReserve=50;
  this.afficher = true;

 }
}
