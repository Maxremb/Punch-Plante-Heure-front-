import { Component, OnInit } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { ConnectedUser } from 'src/app/models/connectedUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: ConnectedUser;

  constructor( private connexionService: ConnexionService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    console.log("NAVBAR ==> connectedUSer ", this.connexionService.connectedUser)
    console.log("isConnected?" , this.isConnected())
  }


  isConnected() : boolean {
    return this.user?  true : false;
  }

  disconnect(){
    this.connexionService.disconnect();
    document.location.reload();
  }

}
