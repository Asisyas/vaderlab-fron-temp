import {Routes} from '@angular/router';
import {SubHeaderComponent} from './component/sub-header/sub-header.component';
import {CargoSearchComponent} from './component/logistic/cargo-search/cargo-search.component';
import {CargoMyListComponent} from './component/logistic/cargo-my-list/cargo-my-list.component';
import {CargoCreateComponent} from './component/logistic/cargo-create/cargo-create.component';


const CARGO_ROUTES = [
  {
    path: 'search', component: CargoSearchComponent
  },
  {
    path: 'my', component: CargoMyListComponent
  }
];

const CARGO_SUB_ROUTES = [
  { path: '/cargo/search', 'label': 'Search' },
  { path: '/cargo/my', 'label': 'My Cargo'  },
];



export const APP_ROUTES: Routes = [
  {
    path: 'cargo', component: SubHeaderComponent, children: CARGO_ROUTES, data: { 'menu_items': CARGO_SUB_ROUTES }
  }
];
