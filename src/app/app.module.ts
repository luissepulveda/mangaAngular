import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMangaComponent } from './header-manga/header-manga.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyMangaComponent } from './body-manga/body-manga.component';
import { MangaDetailComponent } from './manga-detail/manga-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderMangaComponent,
    BodyMangaComponent,
    MangaDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
