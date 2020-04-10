import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminUpdateDto } from 'src/app/models/admin-update-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare function maFonction(): any;

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./detail-admin.component.css']
})
export class DetailAdminComponent implements OnInit {

  adminUpdateForm: FormGroup;
  admin: AdminUpdateDto = new AdminUpdateDto();
  messageValidation = '';
  error: boolean;

  constructor(private service: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.getAdminById();
    maFonction();
    this.adminUpdateForm = new FormGroup({
      pwd: new FormControl(this.admin.pwd),
      pseudo: new FormControl(this.admin.pseudo),
      mail: new FormControl(this.admin.mail),
    });
  }
  

  getAdminById(): void {
    const identifier = +this.route.snapshot.paramMap.get('identifier');
    this.service.getAdmin(identifier).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.admin = responsedto.body;
        }
      }
    );
  }


  update() {
    this.service.update(this.admin).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! Vous avez modifié vos information avec succès !';
          this.error = false;
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
