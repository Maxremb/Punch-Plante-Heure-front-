import { Component, OnInit } from '@angular/core';
import { UtilisateurCreateDto } from 'src/app/models/utilisateur-create-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InscriptionService } from 'src/app/services/inscription.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  util = new UtilisateurCreateDto();
  messageValidation = '';
  error: boolean;
  samePwd = true;

  inscriptionForm: FormGroup;

  pwd2 = '';

  constructor(private service: InscriptionService) { }

  ngOnInit(): void {
    this.inscriptionForm = new FormGroup(
      {
        pseudo: new FormControl(this.util.pseudo, Validators.required),
        lastName: new FormControl(this.util.lastName, [Validators.required]),
        firstName: new FormControl(this.util.firstName, Validators.required),
        mail: new FormControl(this.util.mail, [Validators.required, Validators.email]),
        pwd: new FormControl(this.util.pwd, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), Validators.minLength(8)]),
        pwd2: new FormControl('', Validators.required),
        phone: new FormControl(this.util.phone)
        //picture: new FormControl(this.util.picture) // Si on a le temps d'implementer le transfert d'images au back
      }
    )

  }

  get pwd(): any { return this.inscriptionForm.get('pwd'); }

  save(): void {;
    console.log(this.util);

      this.service.save(this.util).subscribe(
        responseDto => {
          if(!responseDto.error){
            this.messageValidation = "Vous êtes inscrit. Veulliez maintenant vous connecter avec votre nouveau email et mot de passe";
            location.href = "connexion";
          } else {
            this.messageValidation = responseDto.message;
            this.error = true;
          }
        },

        responseError => {
          console.log(responseError);
          this.messageValidation = responseError.error.message;
          this.error = true;
        }
      )

  }

  comparePwd(){
    this.samePwd = this.util.pwd === this.pwd2;
  }


}
