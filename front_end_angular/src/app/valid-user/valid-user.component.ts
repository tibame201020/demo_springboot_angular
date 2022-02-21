import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-valid-user',
  templateUrl: './valid-user.component.html',
  styleUrls: ['./valid-user.component.css']
})
export class ValidUserComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      console.log(queryParams['validToken']);
    });
  }

}
