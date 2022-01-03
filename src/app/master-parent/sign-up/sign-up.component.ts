import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/serviceauth/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isCheckedManager = false;
  isCheckedAdmin = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  submitData(mail: any, pass: any, name: any){
    const roles: string[] = ["Client"];
    if (this.isCheckedManager) {roles.push("Manager");}
    if (this.isCheckedAdmin) {roles.push("Admin");}
    this.authService.SignUp(mail, pass, name, roles)
  }

}
