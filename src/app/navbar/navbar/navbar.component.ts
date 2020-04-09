import { Component, OnInit } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private connexionService: ConnexionService) { }

  ngOnInit(): void {

    let user = localStorage.getItem('connectedUser');
    console.log("NAVBAR ==> connectedUSer ", this.connexionService.connectedUser)
    console.log("isConnected?" , this.isConnected())
  }


  isConnected() : boolean {
    return this.connexionService.connectedUser ?  true : false;
  }

  disconnect(){
    this.connexionService.disconnect();
  }

}
