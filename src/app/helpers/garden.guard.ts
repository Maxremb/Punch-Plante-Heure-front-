import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { AuthService } from '../services/auth.service';
import { ConnectedUser } from '../models/connectedUser';

@Injectable({
  providedIn: 'root'
})
export class GardenGuard implements CanActivate {

  constructor(protected router: Router, protected service: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));  
      const userGardens = JSON.parse(localStorage.getItem('userGardens'));


    // Si utilisater connecté
    if (connectedUser) {

      return this.checkToken4Garden(next, userGardens);

    }

    this.router.navigate(['/connexion']);
    return false;
  }

  private checkToken4Garden(next: ActivatedRouteSnapshot, clientGardenIds: Array<number>): Promise<boolean> {

    let promise = new Promise<boolean>((resolve, reject) => {
      this.service.getUserGardens().toPromise().then(returnedIds => {
        
        if (JSON.stringify(clientGardenIds) != JSON.stringify(returnedIds)) {
          localStorage.setItem('userGardens', JSON.stringify(returnedIds));
        }
        const currentGardenId = +next.paramMap.get('id');
        let activateRoute = returnedIds.indexOf(currentGardenId) !== -1;
        if(!activateRoute){
          this.router.navigate(['jardin']);
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
