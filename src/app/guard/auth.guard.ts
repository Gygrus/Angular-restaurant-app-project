import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthService} from "../services/serviceauth/auth.service";
import firebase from "firebase/compat";
import {DatabaseDataService} from "../services/service-database/database-data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService,
              public db: DatabaseDataService,
              public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.afAuth.authState.pipe(
      take(1),
      map(user => {
        if (user === null){
          alert("Musisz być zalogowany!");
          this.router.navigate(['sign-in']);
          return false;
        }
        const routeRoles = route.data && route.data['roles'];
        const userData = user;
        this.db.usersList.subscribe(() => {
          if (this.authService.userDetails === userData){
            if (!this.authService.checkIfHasRole(userData.uid, routeRoles)) {
              alert("Odmowa dostępu, brak uprawnień.");
              this.router.navigate(['home']);
              return false;
            }
            return true;
          }
        return true;
        })
        return true;
        }
      )
      )

  }

}
