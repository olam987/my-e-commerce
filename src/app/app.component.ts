import {Component, OnInit} from '@angular/core';
import {HomeService} from "./sites/home/services/home.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private readonly homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.loadAllProducts();
    }
}
