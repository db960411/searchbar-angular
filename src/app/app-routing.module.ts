import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsViewComponent } from './pages/details-view/details-view.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'search-results/:id', component: DetailsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
