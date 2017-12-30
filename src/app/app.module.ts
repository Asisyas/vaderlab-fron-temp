import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
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
import { CargoService } from './service/logistic/cargo/cargo.service';
import { HttpModule } from '@angular/http';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ToastyModule } from 'ng2-toasty';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import {
    MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatListModule, MatCommonModule, MatGridListModule, MatCardModule, MatDatepickerModule,
    MatNativeDateModule, MatSelectModule, MatToolbarModule, MatTabsModule, MatDialogModule, MatIconModule, MatMenuModule,
    MatButtonToggleModule, MatProgressBarModule, MatProgressSpinnerModule, MatTableModule, MatSortModule,
    MatTooltipModule, MatStepperModule,
} from '@angular/material';

import { AuthService } from './service/secured/auth-service';
import { SessionService } from './service/core/session.service';
import { GeocoderService } from './service/google/geocoder/geocoder.service';
import { GooglePlaceidComponent } from './control/google-placeid/google-placeid.component';
import { UserService } from './service/user/user.service';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CargoFilterMyListComponent } from './component/logistic/cargo-filter-my-list/cargo-filter-my-list.component';
import { CargoFilterCreateComponent } from './component/logistic/cargo-filter-create/cargo-filter-create.component';
import {FilterService} from "./service/logistic/cargo/filter.service";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SubHeaderComponent,
        CargoSearchComponent,
        CargoCreateComponent,
        CargoMyListComponent,
        GeocoderComponent,
        TimeAgoPipe,
        GooglePlaceidComponent,
        CargoFilterCreateComponent,
        CargoFilterMyListComponent,
    ],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        HttpClientModule,
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
        MatIconModule, MatMenuModule, MatButtonToggleModule, MatProgressBarModule, MatProgressSpinnerModule,
        MatTableModule, MatSortModule, MatTooltipModule, MatStepperModule,
        /** **/

        ToastyModule.forRoot(),
        RouterModule.forRoot( APP_ROUTES, { enableTracing: environment.debug_router }),
        AgmCoreModule.forRoot({
            apiKey: environment.maps_google_api_key,
            libraries: ['places'],
            language: 'ru',
        })
    ],
    entryComponents: [CargoCreateComponent, CargoFilterCreateComponent],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'RU'
        },
        UserService,
        SessionService,
        OAuthService,
        ApiService,
        CargoService,
        FilterService,
        AuthService,
        GeocoderService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(translate: TranslateService) {
        translate.setDefaultLang('ru');
    }
}
