import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "./service/user/user.service";

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent implements OnInit {

  title = 'app';

  @Input()
  ready =  false;

  constructor(
    private userService: UserService
  ) {
    this.userService.initedStateObserver().subscribe((ready) => {
      this.ready = ready;
    });
  }

  ngOnInit(): void {
  }
}
