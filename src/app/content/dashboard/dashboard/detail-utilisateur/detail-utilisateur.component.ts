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
  lastName: string;
  firstName: string;
  pseudo: string;
  mail: string;
  pwd: string;
  desc: string;
  phone: number;
  reput: string;
  news: boolean;
  active: boolean;
  picture: string;
  identifier: number;
  utilisateur: UtilisateurUpdateDto = new UtilisateurUpdateDto();

  messageValidation = '';
  error: boolean;

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
    });
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
          this.messageValidation = 'BRAVO ! Le departement a bien été modifié.';
          this.error = false;
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! Le departement n\'a pas été modifié.';
        this.error = true;
      }

    );
  }


}