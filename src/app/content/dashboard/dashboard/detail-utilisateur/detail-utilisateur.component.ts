import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

declare function maFonction(): any;

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.css']
})
export class DetailUtilisateurComponent implements OnInit {

  userUpdateForm: FormGroup;
  
  utilisateur: UtilisateurUpdateDto = new UtilisateurUpdateDto();

  messageValidation = '';
  error: boolean;

  samePwd = true;
  password2 = '';

  constructor(private service: UtilisateurService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUserById();
    maFonction();
    this.userUpdateForm = new FormGroup({
      firstName: new FormControl(this.utilisateur.firstName),
      lastName: new FormControl(this.utilisateur.lastName),
      pseudo: new FormControl(this.utilisateur.pseudo),
      mail: new FormControl(this.utilisateur.mail),
      phone: new FormControl(this.utilisateur.phone),
      picture: new FormControl(this.utilisateur.picture),
      pwd: new FormControl(this.utilisateur.pwd),
      password2: new FormControl('',),

    });
  }

  get pwd(): any { return this.userUpdateForm.get('pwd'); }

  comparePwd(){
    this.samePwd = this.utilisateur.pwd === this.password2;
  }
  


  getUserById(): void {
    const identifier = +this.route.snapshot.paramMap.get('identifier');
    this.service.getUtilisateur(identifier).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.utilisateur = responsedto.body;
        }
      }
    );
  }


  update() {
    this.service.update(this.utilisateur).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! Vous avez modifié vos information avec succès !';
          this.error = false;
          document.location.reload();
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! Vos informations n\'ont pas pu être modifiées !';
        this.error = true;
      }

    );
  }


}
