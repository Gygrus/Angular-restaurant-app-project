import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/service-pagination/pagination.service';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.css']
})
export class PaginationBarComponent implements OnInit {

  constructor(public paginInfo: PaginationService) { }

  ngOnInit(): void {
  }

}
