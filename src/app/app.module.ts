import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnimeDataBase } from './shared/anime.database';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/search/search.component';

const ROUTES = [
  { path: '', component: MainComponent },
  { path: 'searchlist', component: SearchListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'result/:genre/:query', component: ResultComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchListComponent,
    ResultComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AnimeDataBase],
  bootstrap: [AppComponent],
})
export class AppModule {}
