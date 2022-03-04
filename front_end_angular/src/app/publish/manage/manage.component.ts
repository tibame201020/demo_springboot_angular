import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/side-bar/side-bar.service';
import { PUBLISH_SIDE_BAR_CONFIG } from '../side-bar-config';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PUBLISH_SIDE_BAR_CONFIG);
  }

}
