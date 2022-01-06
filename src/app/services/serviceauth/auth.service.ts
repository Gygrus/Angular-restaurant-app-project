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
import {persistanceList} from "../../master-parent/header/admin-view/admin-view.component";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<firebase.User | null | undefined>;
  userDetails: firebase.User | null | undefined = null;
  userList: any[] | undefined;
  userRoles: any[] | undefined;
  currentPersistence: number | undefined;

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
      // @ts-ignore
      this.userRoles = e.find((item: { uid: any; }) => item.uid === this.userDetails.uid).roles;
    })
    this.db.persistence.subscribe(e => {
      this.currentPersistence = e.payload.val();
      this.afAuth.setPersistence(persistanceList[e.payload.val()]);
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
      isBanned: false,
      roles: roles
    }
    this.db.addUserToDB(userData);
  }

  checkIfHasRole(userID: any, roles: any[]){
    let curRoles = [];
    if (this.userList){ // @ts-ignore
      curRoles = this.userList.find((item: { uid: any; }) => item.uid === userID).roles; }
    if (curRoles) {
      for (let role of roles) {
        // @ts-ignore
        if (curRoles.includes(role)) {
          return true;
        }
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
    let result = [];
    if (this.userList) {
      let orderHist = this.userList!.find(user => user.uid === userID).orderHist
      if (orderHist){
        for (let item of this.userList!.find(user => user.uid === userID).orderHist){
          if (item){ result.push(item); }
        }
      }
      return result;
    }
    return []
  }

  checkIfBanned(userToCheck: any) {
    if (this.userList){
      return this.userList.find(user => user.uid === userToCheck.uid).isBanned;
    }
  }


}
