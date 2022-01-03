import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/serviceauth/auth.service";
import firebase from "firebase/compat/app";
import auth = firebase.auth;

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  localOption = auth.Auth.Persistence.LOCAL;
  sessionOption = auth.Auth.Persistence.SESSION;
  noneOption = auth.Auth.Persistence.NONE;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  setPersistence(option: any){
    this.authService.afAuth.setPersistence(option);
  }

}
