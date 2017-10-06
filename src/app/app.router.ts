import {Routes} from '@angular/router';
import {SubHeaderComponent} from './component/sub-header/sub-header.component';
import {CargoSearchComponent} from './component/cargo-search/cargo-search.component';
import {CargoMyListComponent} from './component/cargo-my-list/cargo-my-list.component';
import {CargoCreateComponent} from './component/cargo-create/cargo-create.component';


const CARGO_ROUTES = [
  {
    path: 'search', component: CargoSearchComponent
  },
  {
    path: 'my', component: CargoMyListComponent
  },
  {
    path: 'create', component: CargoCreateComponent,
  }
];


export const APP_ROUTES: Routes = [
  {
    path: 'cargo', component: SubHeaderComponent, children: CARGO_ROUTES, data: { 'menu_items': '' }
  }
];
