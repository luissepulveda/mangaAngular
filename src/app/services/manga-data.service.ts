import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MangaDataInfo, Relationships, Tag } from 'src/interface/bodyInterfaces';

@Injectable({
  providedIn: 'root'
})



export class MangaDataService {
  
  private urlApi = 'https://api.mangadex.org'
  

  constructor(private http:HttpClient) { 
  }

  getData(){
    let options = {
      params:{
        limit:25
      }
    }
    return this.http.get(this.urlApi + '/manga/', options)
  }

  getDataSpecifyManga(idManga:any){
    return this.http.get(this.urlApi + "/manga/" + idManga)
  }
  getCoverName(coverNameArt:string){
    return this.http.get(this.urlApi + '/cover/' + coverNameArt)
  }

  getChapterData(idChapter:string){
    return this.http.get(this.urlApi + "/chapter/" + idChapter)
  }
  getScanName(idScan:string){
    return this.http.get(this.urlApi + "/group/" + idScan)
  }

  // getChapterManga(idManga:string , content:string){
  //   let orderChapter = {
  //     params:{
  //       offset: 0,
  //       limit : 50,
  //       "contentRating[]" : content,
  //       "order[chapter]":"asc",
  //       "includes[]":"manga"
  //     }
  //   }
  //   return this.http.get(this.urlApi + "/manga/" + idManga + "/feed", orderChapter)
  // }

  getChapterDataImages(idChapter:string){
    return this.http.get(this.urlApi + "/at-home/server/" + idChapter)
  }

  getChapterMangaOffset(idManga:string ,tag:string, offset:number){
    let orderChapter = {
      params:{
        limit : 500,
        offset : offset,
        "contentRating[]" : tag,
        "order[chapter]":"asc",
        "includes[]":"manga"
      }
    }
    return this.http.get(this.urlApi + "/manga/" + idManga + "/feed", orderChapter)
  }
  


  
  //GET ALL DATA MANGA





  getMangaName(dataManga:MangaDataInfo){
    let nameManga = dataManga?.attributes?.title?.en
    if( nameManga == undefined ){
      nameManga = dataManga?.attributes.title?.ko
      let nameReplace = nameManga?.replace(/[^a-zA-Z0-9\s]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')
      dataManga.name = nameReplace
    }else{
      let nameReplace = nameManga?.replace(/[^a-zA-Z0-9\s]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')
      dataManga.name = nameReplace
    }
    

  }

  getDescription(dataManga:MangaDataInfo){
    let description = dataManga?.attributes?.description?.en
    let wordsLimit = 120
    let word = description?.split(' ')
    if ( word?.length == undefined){
      dataManga.description = 'Description not exists'
    }else{
      dataManga.description = word.length > wordsLimit ? word.slice(0, wordsLimit).join(' ') + '...' : description
    }
  }

  
  getCoverFileName(dataManga:MangaDataInfo){
    let coverId = dataManga?.relationships.find((dataRelation:Relationships) => dataRelation?.type == 'cover_art').id
    let mangaId = dataManga?.id
    this.getCoverName(coverId)?.subscribe((dataCover:any) => {
      let coverFileName = dataCover?.data?.attributes.fileName
      dataManga.urlCover = "https://uploads.mangadex.org/covers/" + mangaId + "/" + coverFileName + ".256.jpg"
    })
  }

  getGenres(dataManga:MangaDataInfo){
    let genres = dataManga?.attributes?.tags?.map((mangaTag:Tag) => mangaTag?.attributes?.name?.en)
    dataManga.genre = genres.slice(0, 4)
  }

  getScanNameData(dataManga:MangaDataInfo){
    let idChapter = dataManga?.attributes?.latestUploadedChapter
    this.getChapterData(idChapter)?.subscribe((dataChapter:any) => {
      dataManga.chapter = dataChapter?.data?.attributes?.chapter
      let scanId = dataChapter?.data?.relationships?.find((scanlationType:any) => scanlationType?.type == 'scanlation_group').id
      this.getScanName(scanId)?.subscribe((dataScan:any) => {
        dataManga.scanName = dataScan?.data?.attributes?.name
      })
    })
  }

}
