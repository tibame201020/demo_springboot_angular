import { ForwardMessageService } from './../forward-message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forward',
  templateUrl: './forward.component.html',
  styleUrls: ['./forward.component.css']
})
export class ForwardComponent implements OnInit {
  public seconds:number = 3;
  constructor(
    public forwardMessageService: ForwardMessageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const interval = setInterval(()=>{
      this.seconds = this.seconds - 1;
    }, 1000);
    const timeout = setTimeout(() => {
      if (window.location.pathname == '/forward') {
        this.router.navigate([this.forwardMessageService.getNextRoute]);
      }
      clearInterval(interval);
      clearTimeout(timeout);
    }, this.seconds * 1000);
  }

}
