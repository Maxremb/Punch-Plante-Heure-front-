import { Component, OnInit } from '@angular/core';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { ConnectedUser } from 'src/app/models/connectedUser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: ConnectedUser;
  utilisateur: UtilisateurUpdateDto = new UtilisateurUpdateDto();
  
  constructor( ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    //this.getUtilisateur();
  }

 // getUtilisateur() {
  //  this.service.getId(this.user.id).subscribe(
  //    (responseDto) => {
   //         if (!responseDto.error) {
    //          this.utilisateur = this.responseDto.body;
  //          }
   //       }
   //   );
    
 // }

  desactiver(id: number) {
    this.utilisateur.active = false;
    
  }
  
}
