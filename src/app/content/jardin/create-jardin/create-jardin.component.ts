import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JardinCreateDto } from 'src/app/models/jardin-create-dto';
import {JardinService} from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto} from 'src/app/models/utilisateur-update-dto';
import { DepartementCreateDto } from 'src/app/models/departement-create-dto';
import { DepartementService } from 'src/app/services/departement.service';


@Component({
  selector: 'app-create-jardin',
  templateUrl: './create-jardin.component.html',
  styleUrls: ['./create-jardin.component.css']
})

export class CreateJardinComponent implements OnInit {

  addJardinForm: FormGroup;
  jardin = new JardinCreateDto;
  messageValidation = null;
  messageErreur = null;
  utilisateurActif = new UtilisateurUpdateDto;
  allDepartements = new Array<DepartementCreateDto>();

  constructor(
    private service : JardinService,
    private deptService : DepartementService,
    ) { }

  ngOnInit(): void {
    this.getAllDept();
    // Affecter l'user actif au jardin
    //this.utilisateurActif = this.service.utilisateurActif
    this.addJardinForm = new FormGroup({
      "name": new FormControl(this.jardin.name, Validators.required),
      "ground": new FormControl(this.jardin.ground, Validators.required),
      "length": new FormControl(this.jardin.length),
      "width": new FormControl(this.jardin.width),
      "dept": new FormControl(this.jardin.dept, Validators.required),
      "user" : new FormControl(this.jardin.user = this.utilisateurActif),
    })
  }

  get name() { return this.addJardinForm.get('name') }
  get ground() { return this.addJardinForm.get('ground') }
  get length() { return this.addJardinForm.get('length') }
  get width() { return this.addJardinForm.get('width') }
  get dept() {return this.addJardinForm.get('dept')}
  get user() {return this.addJardinForm.get('user')}

  create() {
    this.service.create(this.jardin).subscribe(
     responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
        } else { this.messageErreur = responseDto.message; }
       }
    )
  }

  getAllDept() {
    this.deptService.getAll().subscribe(
      responseDto => {
        if (!responseDto.error) {this.allDepartements = responseDto.body;}
      }
    )
  }
}
