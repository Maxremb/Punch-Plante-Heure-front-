import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { DepartementCreateDto } from 'src/app/models/departement-create-dto';

@Component({
  selector: 'app-update-jardin',
  templateUrl: './update-jardin.component.html',
  styleUrls: ['./update-jardin.component.css']
})
export class UpdateJardinComponent implements OnInit {

  updateJardinForm: FormGroup;
  jardin: JardinUpdateDto;
  utilisateurActif = new UtilisateurUpdateDto;
  messageValidation = null;
  messageErreur = null;
  allDepartements = new DepartementCreateDto;

  constructor(private service: JardinService) { }

  ngOnInit(): void {
    this.jardin = this.service.jardin;
    // Affecter l'user actif au jardin
    //this.utilisateurActif = this.service.utilisateurActif
    this.updateJardinForm = new FormGroup({
      'name': new FormControl(this.jardin.name),
      'sol': new FormControl(this.jardin.ground),
      'length': new FormControl(this.jardin.length),
      'width': new FormControl(this.jardin.width),
      'dept': new FormControl(this.jardin.dept),
      'user': new FormControl(this.jardin.user),
    })
  }

  get name() { return this.updateJardinForm.get('name') }
  get ground() { return this.updateJardinForm.get('ground') }
  get length() { return this.updateJardinForm.get('length') }
  get width() { return this.updateJardinForm.get('width') }
  get dept() { return this.updateJardinForm.get('dept') }
  get user() { return this.updateJardinForm.get('user') }

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
