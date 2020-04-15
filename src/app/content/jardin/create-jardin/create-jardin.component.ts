import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { DepartementDto } from 'src/app/models/departement-dto';
import { JardinCreateDto } from 'src/app/models/jardin-create-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectedUser } from 'src/app/models/connectedUser';


@Component({
  selector: 'app-create-jardin',
  templateUrl: './create-jardin.component.html',
  styleUrls: ['./create-jardin.component.css']
})

export class CreateJardinComponent implements OnInit {

  addJardinForm: FormGroup;
  jardin = new JardinCreateDto();
  departement: DepartementDto;
  depNum: number;
  //message fct
  messageValidation = null;
  messageErreur = null;
  
  //liste de tout les depts
  allDepartements = new Array<DepartementDto>();
  //user actif
  user: ConnectedUser;
  utilisateur: UtilisateurUpdateDto = new UtilisateurUpdateDto();


  constructor(
    private service: JardinService,
    private route: ActivatedRoute,
     private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    this.addJardinForm = new FormGroup({
      "name": new FormControl(this.jardin.name, Validators.required),
      "ground": new FormControl(this.jardin.ground, Validators.required),
      "length": new FormControl(this.jardin.length),
      "width": new FormControl(this.jardin.width),
      "dept": new FormControl(this.depNum, Validators.required),
      'depthGround': new FormControl(this.jardin.dept),

    })
  }

  get name() { return this.addJardinForm.get('name') }
  get ground() { return this.addJardinForm.get('ground') }
  get length() { return this.addJardinForm.get('length') }
  get width() { return this.addJardinForm.get('width') }
  get dept() { return this.addJardinForm.get('dept') }
  get depthGround() { return this.addJardinForm.get('depthGround') }

  

  //creation jardin + erecuperation objet créé
  create() {
    this.jardin.dept = new DepartementDto();
    this.jardin.dept.depNum = this.depNum;
    this.utilisateur.identifier = this.user.id;
    this.jardin.user = this.utilisateur;
    this.service.create(this.jardin).subscribe(

      responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
          this.router.navigate(['jardin']);

        } else { this.messageErreur = responseDto.message; }
      }
    )
  }



}
