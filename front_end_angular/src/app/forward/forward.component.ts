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
    setInterval(()=>{
      this.seconds = this.seconds - 1;
    }, 1000);
    setTimeout(() => {
      this.router.navigate([this.forwardMessageService.getNextRoute]);
    }, this.seconds * 1000);
  }

}
