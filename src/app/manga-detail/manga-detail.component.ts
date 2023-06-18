import { Component, OnInit } from '@angular/core';
import { MangaDataService } from '../services/manga-data.service';
import { MangaDataInfo } from 'src/interface/bodyInterfaces';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss']
})

export class MangaDetailComponent {

  public dataManga: MangaDataInfo
  public dataMangaChapter: any[] = []
  public filteredDataMangerChapter: any[] = []
  public expanded: boolean = false
  public page = 1

  constructor(private mangaService: MangaDataService, private router: Router, private route: ActivatedRoute) { this.dataManga = history.state }

  ngOnInit() {

    this.route.queryParams.subscribe((idManga: any) => {
      this.mangaService.getDataSpecifyManga(idManga.id).subscribe((mangaData: any) => {
        this.dataManga = mangaData.data
        this.mangaService.getMangaName(this.dataManga)
        this.mangaService.getDescription(this.dataManga)
        this.mangaService.getCoverFileName(this.dataManga)
        this.mangaService.getGenres(this.dataManga)
        this.mangaService.getScanNameData(this.dataManga)
        this.getMangaNextTagOffset(this.dataManga?.id, 'safe', 0)
      })
    })
  }



  // getMangaNextTag(mangaId: string, tag: string) {
  //   this.mangaService.getChapterManga(mangaId, tag).subscribe((element: any) => {
  //     let arrayData: any[] = []
  //     if (element.data.length != 0) {
  //       element.data.forEach((dataManga: any) => {
  //         let indexData = arrayData.findIndex(data => data.chapter == dataManga.attributes.chapter)
  //         if (indexData > -1) {
  //           arrayData[indexData].data.push(dataManga)
  //         } else {
  //           arrayData.push({
  //             data: [dataManga],
  //             chapter: dataManga.attributes.chapter
  //           })
  //         }
  //       })
  //       this.dataMangaChapter = arrayData
  //       this.filteredDataMangerChapter = arrayData.slice(0, 5)
  //     } else if (tag == "safe") {
  //       this.getMangaNextTag(this.dataManga!.id, "suggestive")
  //     } else if (tag == "suggestive") {
  //       this.getMangaNextTag(this.dataManga!.id, "erotica")
  //     } else if (tag == "erotica") {
  //       this.getMangaNextTag(this.dataManga!.id, "pornographic")
  //     }
  //   })
  // }

  showMoreFunction() {
    if (!this.expanded) {
      this.filteredDataMangerChapter = this.dataMangaChapter
      this.expanded = true
    }
    else {
      this.filteredDataMangerChapter = this.dataMangaChapter.slice(0, 5)
      this.expanded = false
    }
  }


  getMangaNextTagOffset(mangaId:string, tag:string, offset:number){
    this.mangaService.getChapterMangaOffset(mangaId, tag, offset).subscribe((element:any) => {
      let arrayData: any[] = []
      if (element.data.length != 0){
        element.data.forEach((dataManga: any) => {
          let indexData = arrayData.findIndex(data => data.chapter == dataManga.attributes.chapter)
          if (indexData > -1) {
            arrayData[indexData].data.push(dataManga)
          }else {
            arrayData.push({
              data: [dataManga],
              chapter: dataManga.attributes.chapter
            })
          }
        })
        this.dataMangaChapter = arrayData
        this.filteredDataMangerChapter = [...new Set([...this.filteredDataMangerChapter, ...arrayData])]
        // this.filteredDataMangerChapter = arrayData
        console.log(this.filteredDataMangerChapter)
        this.getMangaNextTagOffset(mangaId, tag, offset+500)
      }else if( tag == "safe"){
        this.getMangaNextTagOffset(this.dataManga!.id, "suggestive", offset)
      }else if(tag == "suggestive"){
        this.getMangaNextTagOffset(this.dataManga!.id, "erotica", offset)
      }else if(tag == "erotica"){
        this.getMangaNextTagOffset(this.dataManga!.id, "pornographic", offset)
      }
    })
  }

  // getChapterOffset(mangaId:string,offset:number){
  //   let array : any[] =[]
  //   this.mangaService.getChapterMangaOffset(mangaId,offset).subscribe((element:any) => {
  //     if(element.data != 0){
  //       array.push(element)
  //       this.getChapterOffset(mangaId,offset+50)
  //       console.log(array)
  //     }else{
  //       console.log("se llego al limite maximo")
  //     }
  //   })
  // } 
  // }



}