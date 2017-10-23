import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.router';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { SubHeaderComponent } from './component/sub-header/sub-header.component';
import { CargoSearchComponent } from './component/logistic/cargo-search/cargo-search.component';
import {CargoCreateComponent} from './component/logistic/cargo-create/cargo-create.component';
import { CargoMyListComponent } from './component/logistic/cargo-my-list/cargo-my-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatepickerModule } from 'angular2-material-datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GeocoderComponent } from './control/geocoder/geocoder/geocoder.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubHeaderComponent,
    CargoSearchComponent,
    CargoCreateComponent,
    CargoMyListComponent,
    GeocoderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    DatepickerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( APP_ROUTES, { enableTracing: environment.debug_router }),
    AgmCoreModule.forRoot({
      apiKey: environment.maps_google_api_key,
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
