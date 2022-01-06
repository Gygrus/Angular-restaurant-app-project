import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/serviceauth/auth.service";

@Component({
  selector: 'app-order-hist',
  templateUrl: './order-hist.component.html',
  styleUrls: ['./order-hist.component.css']
})
export class OrderHistComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
