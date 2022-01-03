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

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private ngZone: NgZone,
              private db: DatabaseDataService) {
    this.currentUser = this.afAuth.authState;
    this.currentUser.subscribe( user => {
      this.userDetails = user;
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
        this.SetUserData(result.user, roles);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUserData(user: firebase.User | null, roles: string[]) {
    const userData: User = {
      // @ts-ignore
      uid: user.uid,
      // @ts-ignore
      email: user.email,
      // @ts-ignore
      displayName: user.displayName,
      dishesOrdered: [],
      orderHist: [],
      roles: roles
    }
    this.db.addUserToDB(userData);
  }

}
