import { Article } from './../../model/article';
import { ReadService } from './../read.service';
import { SideBarService } from './../../side-bar/side-bar.service';
import { Component, OnInit } from '@angular/core';
import { READ_SIDE_BAR_CONFIG } from '../side-bar-config';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  articles: Article[] = [];

  constructor(private SideBarService: SideBarService,
    private ReadService: ReadService) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(READ_SIDE_BAR_CONFIG);
    this.ReadService.getAllPublish().subscribe(
      res => {
        this.articles = res;
       }
    )
  }

}
