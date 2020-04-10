import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    // Si utilisater connecté
    if (connectedUser) {
      // Si component a besoin d'autorisations et que l'utilisateur n'est pas autorisé
      if (next.data.roles && next.data.roles.indexOf(connectedUser.role) === -1) {

        this.router.navigate(['/']);
        return false;

      } else {

        return true;
      }

    }

    this.router.navigate(['/connexion']);
    return false;
  }

  /*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      return true;

    }
    */

}
