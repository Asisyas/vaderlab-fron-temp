import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { SubHeaderComponent } from './component/sub-header/sub-header.component';
import { CargoSearchComponent } from './component/cargo-search/cargo-search.component';
import { CargoCreateComponent } from './component/cargo-create/cargo-create.component';
import { CargoMyListComponent } from './component/cargo-my-list/cargo-my-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubHeaderComponent,
    CargoSearchComponent,
    CargoCreateComponent,
    CargoMyListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( APP_ROUTES, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
