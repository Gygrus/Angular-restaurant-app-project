import { Injectable, NgZone } from '@angular/core';
import { User } from "../user";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import '@firebase/auth';
// import firebase from 'firebase/compat';
import firebase from "firebase/compat/app";
import {Observable, switchMap} from "rxjs";
import { of } from 'rxjs';
import {DatabaseDataService} from "../service-database/database-data.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<firebase.User | null | undefined>;
  userDetails: firebase.User | null | undefined = null;
  userList: any[] | undefined;

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private ngZone: NgZone,
              private db: DatabaseDataService) {
    this.currentUser = this.afAuth.authState;
    this.afAuth.authState.subscribe( user => {
      this.userDetails = user;
    })
    this.db.usersList.subscribe(e => {
      this.userList = e;
    })
  }


  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['sign-in']);
    })}


  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email: any, password: any, name: any, roles: string[]) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['home']);
        // @ts-ignore
        result.user.updateProfile(
          {displayName: name}
        )
        this.SetUserData(result.user, roles, name);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUserData(user: firebase.User | null, roles: string[], name: any) {
    const userData: User = {
      // @ts-ignore
      uid: user.uid,
      // @ts-ignore
      email: user.email,
      // @ts-ignore
      displayName: name,
      dishesOrdered: [],
      orderHist: [],
      roles: roles
    }
    this.db.addUserToDB(userData);
  }

  getUserRoles(uid: any){
    // @ts-ignore
    return this.userList.find(item => item.uid === uid).roles;
  }

  checkIfHasRole(user: any, roles: any[]){
    if (user === null || user === undefined){
      return false;
    }
    const curRoles = this.getUserRoles(user.uid);
    for (let role of roles){
      // @ts-ignore
      if (curRoles.includes(role)){
        return true;
      }
    }
    return false;
  }

  checkIfUserBought(name: string){
    const dishesOrdered = this.userList!.find(user => user.uid === this.userDetails!.uid).dishesOrdered;
    return !!(dishesOrdered && dishesOrdered.includes(name));
  }

  getUserHist(){
    const userID = this.userDetails!.uid;
    return this.userList!.find(user => user.uid === userID).orderHist;
  }

}
