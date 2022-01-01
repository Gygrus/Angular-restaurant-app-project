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
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<User>; // Save logged in user data
  userName?: String;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private ngZone: NgZone) {
    // //// Get auth data, then get firestore user document || null
    // // @ts-ignore
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
    //     } else {
    //       return of(null);
    //     }
    //   }
    //   ));
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     // @ts-ignore
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     // @ts-ignore
    //     localStorage.setItem('user', null);
    //     // @ts-ignore
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // });
    // @ts-ignore
    this.userData = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return of(null)
      }
    }))
  }

  // private updateUserData(user: { uid: any; email: any; name: any; }) {
  //     // Sets user data to firestore on login
  //     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //     const data: User = {
  //       uid: user.uid,
  //       email: user.email,
  //       name: user.name,
  //       role: {
  //         client: true
  //       }
  //     }
  //     return userRef.set(data, { merge: true })
  //   }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })}


  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email: any, password: any, name: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['home']);
        // @ts-ignore
        result.user.updateProfile(
          {displayName: name}
        )
        this.SetUserData(result.user);
        this.userName = name;
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUserData(user: firebase.User | null) {
    // @ts-ignore
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      // @ts-ignore
      uid: user.uid,
      // @ts-ignore
      email: user.email,
      // @ts-ignore
      displayName: user.displayName,
      roles: {
        client: true
      }
    }
    this.userName = userData.displayName;
    return userRef.set(userData, {
      merge: true
    })
  }

}
