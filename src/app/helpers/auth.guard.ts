import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/role.enum';
import { ConnectedUser } from '../models/connectedUser';

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

        //this.router.navigate(['/']);
        return false;

      } else {        

        return true;
      }

    }

    this.router.navigate(['/connexion']);
    return false;
  }

  private checkToken(next: ActivatedRouteSnapshot, token: string, user: ConnectedUser){

    this.service.getRole(token).subscribe(
      returnedRole => {
        const role = <Role> returnedRole;

        if(user.role != role){
          user.role = role;
          localStorage.setItem('connectedUser', JSON.stringify(user));
        }

        if(next.data.roles && next.data.roles.indexOf(role) === -1){


          this.router.navigate(['']);
        }
      }
    );

  }

  /*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      return true;

    }
    */

}
