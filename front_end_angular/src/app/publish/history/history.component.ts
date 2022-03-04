import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/side-bar/side-bar.service';
import { PUBLISH_SIDE_BAR_CONFIG } from '../side-bar-config';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PUBLISH_SIDE_BAR_CONFIG);
  }

}
