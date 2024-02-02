import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { DetailedCardComponent } from './components/detailed-card/detailed-card.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsViewComponent } from './pages/details-view/details-view.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultDisplayComponent,
    DetailedCardComponent,
    HomeComponent,
    DetailsViewComponent,
    ResultListComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
