import { Component, OnInit } from '@angular/core';
import { MangaDataService } from '../services/manga-data.service';
import { MangaDataInfo } from 'src/interface/bodyInterfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manga-reader',
  templateUrl: './manga-reader.component.html',
  styleUrls: ['./manga-reader.component.scss']
})
export class MangaReaderComponent {
  
  public idChapter: MangaDataInfo | undefined
  public imageChapter:any [] = []

  constructor(private mangaService:MangaDataService, private route:ActivatedRoute){
  }

ngOnInit(){
  this.route.queryParams.subscribe((dataParam:any) => {
    this.mangaService.getChapterDataImages(dataParam.id).subscribe((dataImages:any) => {
      dataImages.chapter.dataSaver.map((dataChapter:any) => {
        this.imageChapter.push(dataImages.baseUrl + "/data-saver/" +  dataImages.chapter.hash + "/" + dataChapter)
      })
    })
  })
  console.log(this.imageChapter)
}


}
