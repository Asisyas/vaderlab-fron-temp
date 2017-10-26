import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.router';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { SubHeaderComponent } from './component/sub-header/sub-header.component';
import { CargoSearchComponent } from './component/logistic/cargo-search/cargo-search.component';
import { CargoCreateComponent } from './component/logistic/cargo-create/cargo-create.component';
import { CargoMyListComponent } from './component/logistic/cargo-my-list/cargo-my-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatepickerModule } from 'angular2-material-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeocoderComponent } from './control/geocoder/geocoder/geocoder.component';
import { AgmCoreModule } from '@agm/core';
import { ApiService } from './service/core/api.service';
import {CargoService} from './service/logictic/cargo/cargo.service';
import {HttpModule} from '@angular/http';
import {TimeAgoPipe} from 'time-ago-pipe';
import {ToastyModule} from 'ng2-toasty';

import {
  MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule,
  MatListModule, MatCommonModule, MatGridListModule, MatCardModule, MatDatepickerModule,
  MatNativeDateModule, MatSelectModule, MatToolbarModule, MatTabsModule, MatDialogModule, MatIconModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubHeaderComponent,
    CargoSearchComponent,
    CargoCreateComponent,
    CargoMyListComponent,
    GeocoderComponent,
    TimeAgoPipe
  ],
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    DatepickerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    /** **/
    MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatListModule, MatCommonModule, MatGridListModule, MatCardModule, MatDatepickerModule,
    MatNativeDateModule, MatSelectModule, MatToolbarModule, MatTabsModule, MatDialogModule,
    MatIconModule,
    /** **/

    ToastyModule.forRoot(),
    RouterModule.forRoot( APP_ROUTES, { enableTracing: environment.debug_router }),
    AgmCoreModule.forRoot({
      apiKey: environment.maps_google_api_key,
      libraries: ['places']
    })
  ],
  entryComponents: [CargoCreateComponent],
  providers: [
    ApiService,
    CargoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
