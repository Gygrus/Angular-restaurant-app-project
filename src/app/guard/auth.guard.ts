import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/serviceauth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService,
              public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.userDetails){
      console.log('Access denied!');
      this.router.navigate(['sign-in']);
      return false;
    }
    const routeRoles = route.data && route.data['roles'];
    const userData = this.authService.userDetails;
    if (!this.authService.checkIfHasRole(userData, routeRoles)){
      console.log('Access denied!');
      this.router.navigate(['sign-in']);
      return false;
    }
    return true;

  }

}
