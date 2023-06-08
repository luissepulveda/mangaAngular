import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaDataService } from '../services/manga-data.service';
import { MangaDataInfo } from 'src/interface/bodyInterfaces';

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss']
})
export class MangaDetailComponent {

  public dataManga:MangaDataInfo | undefined

  constructor(private mangaService: MangaDataService, private route: ActivatedRoute,  private router:Router){

    //Obtener objeto con routerLink
    this.dataManga =  history.state

    console.log(this.dataManga)
  }
  

}
