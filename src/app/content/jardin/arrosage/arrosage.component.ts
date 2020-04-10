import { Component, OnInit, Input } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { ActivatedRoute } from '@angular/router';

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
  idJardin : number
  constructor(
    private jardinservice: JardinService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idJardin = +this.route.snapshot.paramMap.get('id');
    this.getJardin();
    
    maFonction1();

  }
  getJardin() {
    this.jardinservice.getId(this.idJardin).subscribe(
      (resp)=> {
        this.jardin = resp.body;
        this.niveau =  (this.jardin.usefullReserve*10).toString() +"%";
      }
    )

    // this.jardin = new JardinUpdateDto();
    // this.jardin.identifier;
    // this.jardin.usefullReserve;
    // this.niveau =  this.jardin.usefullReserve.toString() +"%";

  }
  setArrosed() {
    this.jardin.arrosed = true;
    
    this.jardinservice.setArrosed(this.idJardin).subscribe( (resp)=>{
      this.jardin = resp.body;
      this.niveau = "100%"
      
    });
    
  }
}
