import { Component, OnInit } from '@angular/core';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  utilisateur: UtilisateurUpdateDto;
  

  constructor( ) { }

  ngOnInit(): void {
    
  }

  
}
