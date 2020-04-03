import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { DepartementDto } from 'src/app/models/departement-dto';

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
  allDepartements = new DepartementDto;

  constructor(private service: JardinService) { }

  ngOnInit(): void {
    //recupere le jardin selectionner
    this.jardin = this.service.jardin;

    // Affecter l'user actif au jardin
    //this.utilisateurActif = this.service.utilisateurActif

    this.updateJardinForm = new FormGroup({
      'name': new FormControl(this.jardin.name),
      'sol': new FormControl(this.jardin.ground),
      'length': new FormControl(this.jardin.length),
      'width': new FormControl(this.jardin.width),
      'dept': new FormControl(this.jardin.dept),
      'user': new FormControl(this.jardin.user = this.utilisateurActif),
    })
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
        } else { this.messageErreur = responseDto.message; }
      }
    );
  }

}
