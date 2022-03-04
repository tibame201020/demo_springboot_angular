import { SideBarService } from '../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { PUBLISH_SIDE_BAR_CONFIG } from './side-bar-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PUBLISH_SIDE_BAR_CONFIG);
  }

}
