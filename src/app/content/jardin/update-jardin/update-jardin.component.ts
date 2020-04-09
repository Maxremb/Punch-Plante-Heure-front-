import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { DepartementDto } from 'src/app/models/departement-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-update-jardin',
  templateUrl: './update-jardin.component.html',
  styleUrls: ['./update-jardin.component.css']
})
export class UpdateJardinComponent implements OnInit {

  updateJardinForm: FormGroup;

  jardin: JardinUpdateDto;
  //user connecté
  utilisateurActif = new UtilisateurUpdateDto;
  //message validation/echec UPDATE
  messageValidation = null;
  messageErreur = null;
  //liste all depts
  allDepartements : Array<DepartementDto>;
  nbDepTotal : number

  idJardin : number;

  constructor(private service: JardinService, private route: ActivatedRoute, private serviceDep: DepartementService, private router: Router) { }

  ngOnInit(): void {
    //recupere l'id du jardin puis le jardin selectionné
    this.idJardin = +this.route.snapshot.paramMap.get('id');
    this.getJardin();

    this.getDep();

    // Affecter l'user actif au jardin
    //this.utilisateurActif = this.service.utilisateurActif


  }

  get name() { return this.updateJardinForm.get('name') }
  get ground() { return this.updateJardinForm.get('ground') }
  get length() { return this.updateJardinForm.get('length') }
  get width() { return this.updateJardinForm.get('width') }
  get dept() { return this.updateJardinForm.get('dept') }


  update() {
    this.service.update(this.jardin).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
          this.getJardin()
          this.router.navigateByUrl("/jardin");
        } else { this.messageErreur = responseDto.message; }
      }
    );
    
  }

  getJardin() {
    
    this.service.getId(this.idJardin).subscribe((resp) => {
      this.jardin = resp.body;
      this.updateJardinForm = new FormGroup({
        'name': new FormControl(this.jardin.name),
        'ground': new FormControl(this.jardin.ground),
        'sol': new FormControl(this.jardin.ground),
        'length': new FormControl(this.jardin.length),
        'width': new FormControl(this.jardin.width),
        'dept': new FormControl(this.jardin.dept),
        'user': new FormControl(this.jardin.user = this.utilisateurActif),
      })
    });
  }

getDep(){
  this.serviceDep.getAllAdmin(0).subscribe(
    (resp)=> {
      this.allDepartements = resp.body.content;
      this.nbDepTotal =resp.body.totalElements;
      for (let index = 1; index < resp.body.totalPages; index++) {
        this.serviceDep.getAllAdmin(index).subscribe((resp) => {
          resp.body.content.forEach(element => {
            this.allDepartements.push(element);
          });
        });
      }
    }
  )
}

}
