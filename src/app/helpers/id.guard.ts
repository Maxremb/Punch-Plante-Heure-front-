import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

// Guard pour les pages liés à l'id de l'utilisateur. Est écrit pour être exectuté après AuthGuard. 

@Injectable({
  providedIn: 'root'
})
export class IdGuard implements CanActivate {

  constructor(protected router: Router, protected service: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));


    if (connectedUser.role != Role.Admin && connectedUser.id != +next.url[2].path) {

      this.router.navigateByUrl(next.url[0].path + "/" + next.url[1].path + "/" + connectedUser.id);
      return false;

    }

    return true;

  }

}
