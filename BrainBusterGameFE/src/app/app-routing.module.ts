import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import {HighscoreComponent} from "./pages/highscore/highscore.component";

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'highscore', component: HighscoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
