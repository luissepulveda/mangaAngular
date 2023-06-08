import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
        limit:12
      }
    }
    return this.http.get(this.urlApi + '/manga/', options)
  }

  getCoverName(coverNameArt:String){
    return this.http.get(this.urlApi + '/cover/' + coverNameArt)
  }

  getChapterData(idChapter:String){
    return this.http.get(this.urlApi + "/chapter/" + idChapter)
  }
  getScanName(idScan:String){
    return this.http.get(this.urlApi + "/group/" + idScan)
  }
}
