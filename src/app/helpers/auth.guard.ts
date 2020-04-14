import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/role.enum';
import { ConnectedUser } from '../models/connectedUser';
import { resolve } from 'dns';

// Empêche l'accés aux pages sans autorisation basé sur le role

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  static user: ConnectedUser;

  constructor(protected router: Router, protected service: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    const token = localStorage.getItem('token');

    console.log("AuthGuard next: ", next);

    // Si utilisater connecté
    if (connectedUser && token) {

      return this.checkToken(next, token, connectedUser);

/*      // Si component a besoin d'autorisations et que l'utilisateur n'est pas autorisé
      if (next.data.roles && next.data.roles.indexOf(connectedUser.role) === -1) {

        return false;

      } else {

        return true;
      } */

    }

    this.router.navigate(['/connexion']);
    return false;
  }

  protected checkToken(next: ActivatedRouteSnapshot, token: string, localUser: ConnectedUser): Promise<boolean> {

    console.log("AuthGuard checkToken: appelé", token);

    let promise = new Promise<boolean>((resolve, reject) => {
      this.service.getConnectedUser(token).toPromise().then(returnedUser => {
        AuthGuard.user = returnedUser;
        if (localUser != returnedUser) {
          localStorage.setItem('connectedUser', JSON.stringify(returnedUser))
        }
        let activateRoute = !(next.data.roles && next.data.roles.indexOf(returnedUser.role) === -1);
        if(!activateRoute){
          this.router.navigate(['']);
        }

        resolve(activateRoute);
      },
      err => {
        localStorage.clear();
        location.href = '';
        reject(err);        
      });
    });

    return promise;
    

  }

}
