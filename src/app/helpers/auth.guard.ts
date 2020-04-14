import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/role.enum';
import { ConnectedUser } from '../models/connectedUser';

// Empêche l'accés aux pages sans autorisation basé sur le role

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  role : Role;

  constructor(private router: Router, private service: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    const token = localStorage.getItem('token');

    // Si utilisater connecté
    if (connectedUser && token) {

      this.checkToken(next, token, connectedUser);

      // Si component a besoin d'autorisations et que l'utilisateur n'est pas autorisé
      if (next.data.roles && next.data.roles.indexOf(connectedUser.role) === -1) {

        return false;

      } else {        

        return true;
      }

    }

    this.router.navigate(['/connexion']);
    return false;
  }

  private checkToken(next: ActivatedRouteSnapshot, token: string, user: ConnectedUser) : void{

    console.log("AuthGuard checkToken: appelé", token);

    this.service.getRole(token).subscribe(
      returnedRole => {
        console.log("Authguard checkToken: returnedRole=" , returnedRole);
        const role = <Role> returnedRole;

        if(user.role != role){
          user.role = role;
          localStorage.setItem('connectedUser', JSON.stringify(user));
        }

        if(next.data.roles && next.data.roles.indexOf(role) === -1){

          this.router.navigate(['']);

        }
      },
      error => {
        console.log("AuthGuard checkToken: error: " , error);
        localStorage.clear();
        this.router.navigate(['']);
      }
    );

  }

}
