import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {JardinService} from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto} from 'src/app/models/utilisateur-update-dto';

import { DepartementService } from 'src/app/services/departement.service';
import { DepartementDto } from 'src/app/models/departement-dto';

import { JardinCreateDto } from 'src/app/models/jardin-create-dto';


@Component({
  selector: 'app-create-jardin',
  templateUrl: './create-jardin.component.html',
  styleUrls: ['./create-jardin.component.css']
})

export class CreateJardinComponent implements OnInit {

  addJardinForm: FormGroup;
  jardin = new JardinCreateDto();
  departement : DepartementDto;
  depNum:  number;
  //message fct
  messageValidation = null;
  messageErreur = null;
  //user actif
  utilisateurActif = new UtilisateurUpdateDto();
  //liste de tout les depts
  allDepartements = new Array<DepartementDto>();
  
 
  
  constructor(
    private service : JardinService,
    private deptService : DepartementService,
    ) { }

  ngOnInit(): void {
    this.getUtilistaeurActif();
   
    
    // Affecter l'user actif au jardin
    //this.utilisateurActif = this.service.utilisateurActif
    this.addJardinForm = new FormGroup({
      "name": new FormControl(this.jardin.name, Validators.required),
      "ground": new FormControl(this.jardin.ground, Validators.required),
      "length": new FormControl(this.jardin.length),
      "width": new FormControl(this.jardin.width),
      "dept": new FormControl(this.depNum, Validators.required),
     
    })
  }

  get name() { return this.addJardinForm.get('name') }
  get ground() { return this.addJardinForm.get('ground') }
  get length() { return this.addJardinForm.get('length') }
  get width() { return this.addJardinForm.get('width') }
  get dept() {return this.addJardinForm.get('dept')}

  getUtilistaeurActif(): void {
    this.utilisateurActif.firstName= "nom";
    this.utilisateurActif.identifier= 1;
  }

  //creation jardin + erecuperation objet créé
  create() {
    
    //this.getDept();
   this.jardin.dept= new DepartementDto();
   this.jardin.dept.depNum =this.depNum;
    this.jardin.user = this.utilisateurActif;
    console.log('user' + this.jardin.user.identifier);
    console.log('debut create subcribe');
    this.service.create(this.jardin).subscribe(
      
     responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
          
         
        } else { this.messageErreur = responseDto.message; }
       }
    )
  }

  // getDept() {
    
  //   this.deptService.getById(this.depNum).subscribe(
  //     respDto => {
  //       this.jardin.dept = respDto.body;
  //       console.log('dep' + this.jardin.dept.name);
  //     }
  //   );
  // }

 
}
