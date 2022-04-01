import { Component, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/side-bar/side-bar.service';
import { PRATICE_SIDE_BAR_CONFIG } from '../side-bar-config';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  dataRange: any;
  constructor(private SideBarService:SideBarService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(PRATICE_SIDE_BAR_CONFIG);
  }

  getDataRange(dataRange: any) {
    this.dataRange = dataRange;
    const startDate = this.dataRange.start ? this.dataRange.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    const endDate = this.dataRange.end ? this.dataRange.end.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }) : '';
    console.log(dataRange)
    console.log(startDate)
    console.log(endDate)
  }

}
