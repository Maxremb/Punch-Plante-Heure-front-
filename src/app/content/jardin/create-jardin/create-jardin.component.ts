import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JardinCreateDto } from 'src/app/models/jardin-create-dto';


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

  constructor( ) { }

  ngOnInit(): void {
    this.addJardinForm = new FormGroup({
      "nom": new FormControl(this.jardin.nom, Validators.required),
      "sol": new FormControl(this.jardin.sol, Validators.required),
      "longueur": new FormControl(this.jardin.longueur),
      "largeur": new FormControl(this.jardin.largeur),
      "departement": new FormControl(this.jardin.departement, Validators.required)
    })
  }

  get nom() { return this.addJardinForm.get('nom') }
  get sol() { return this.addJardinForm.get('sol') }
  get longueur() { return this.addJardinForm.get('longueur') }
  get largeur() { return this.addJardinForm.get('largeur') }
  get departement() {return this.addJardinForm.get('departement')}

  create() {
    /* 
    this.service.create(this.jardin).subscribe(
     responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
        } else { this.messageErreur = responseDto.message; }
       }
       
    )*/
  }
}
