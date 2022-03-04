import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/side-bar.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.showSideBar();
  }

}
