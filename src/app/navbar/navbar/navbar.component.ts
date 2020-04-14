import { Component, OnInit } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { ConnectedUser } from 'src/app/models/connectedUser';

declare function maFonction1():any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: ConnectedUser;

  constructor( private connexionService: ConnexionService) { }

  ngOnInit(): void {
    maFonction1();
    this.isConnected();
    this.isAdmin();
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    console.log("NAVBAR ==> connectedUser ", this.user);
    console.log("isConnected?" , this.isConnected());
    console.log("isAdmin?", this.isAdmin());

  }


  isConnected() : boolean {
    return this.user?  true : false;
  }

  isAdmin() : boolean {

    if (this.user && this.user.role == 'Admin') {
      return true;
    }

    if (this.user && this.user.role == 'Utilisateur') {
      return false;
    }
  }

  disconnect(){
    this.connexionService.disconnect();
    location.href='';
  }

}
