import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  @Input()
  public menu_items: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
  }

  ngOnInit() {

    this.updateRoutes();

    this.userService.getLoggedState().subscribe((data) => {
      this.updateRoutes();
    });
  }

  protected updateRoutes() {
    this.route.data.forEach(value => {
      this.menu_items = this.filterLinks(value['menu_items']);
    });
  }

  protected filterLinks(mi) {
    const links = [];

    if (this.userService.isLoggedIn()) {
      return mi;
    }

    for (let i = 0; i < mi.length; i++) {
      const tmp = mi[i];
      if (tmp.secured) {
        continue;
      }

      links.push(tmp);
    }

    return links;
  }

}
