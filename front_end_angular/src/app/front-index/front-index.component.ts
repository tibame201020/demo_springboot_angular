import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-front-index',
  templateUrl: './front-index.component.html',
  styleUrls: ['./front-index.component.css']
})
export class FrontIndexComponent implements OnInit {
  public user_info = 'default';
  public loginOrNot = 'defaultNot';
  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(
      (data: User) => {
        if (data != null) {
          this.user_info = JSON.stringify(data);
        }
      }
    )
  }
  ngOnInit(): void {
  }


}
