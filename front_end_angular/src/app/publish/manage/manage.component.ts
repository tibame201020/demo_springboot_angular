import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/side-bar.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.showSideBar();
  }

}
