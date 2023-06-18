import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyMangaComponent } from './body-manga/body-manga.component';
import { MangaDetailComponent } from './manga-detail/manga-detail.component';
import { MangaReaderComponent } from './manga-reader/manga-reader.component';


const routes: Routes = [
  { 
    // path: 'heroes', component: HeroesComponent 
    path: 'home' , component: BodyMangaComponent

  },
  {
    // path: 'manga' , component: MangaDetailComponent

    //Obtener objeto con routerLink
    path: 'manga' , component: MangaDetailComponent
  },
  {
    path: 'read', component: MangaReaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }