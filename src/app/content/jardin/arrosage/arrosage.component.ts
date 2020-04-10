import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';

declare function maFonction1(): any;
@Component({
  selector: 'app-arrosage',
  templateUrl: './arrosage.component.html',
  styleUrls: ['./arrosage.component.css']
})
export class ArrosageComponent implements OnInit {

  jardin: JardinUpdateDto
  afficher: boolean = false
  niveau : string
  constructor(
    private jardinservice: JardinService,
  ) { }

  ngOnInit(): void {
    this.getJardin();
    maFonction1();

  }
  getJardin() {
    this.jardin = new JardinUpdateDto();
    this.jardin.identifier;
    this.jardin.usefullReserve;
    this.niveau =  this.jardin.usefullReserve.toString() +"%";

  }
  setArrosed() {
    this.jardin.isArrosed = true;
  }
}
