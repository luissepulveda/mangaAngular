import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MangaDataService } from '../services/manga-data.service';
import { MangaDataInfo, Relationships } from 'src/interface/bodyInterfaces';
import KeenSlider, { KeenSliderInstance, KeenSliderPlugin } from "keen-slider"
import { Router } from '@angular/router';



function ThumbnailPlugin(main: KeenSliderInstance): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          main.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      addActive(slider.track.details.rel)
      addClickEvents()
      main.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}



@Component({
  selector: 'app-body-manga',
  templateUrl: './body-manga.component.html',
  styleUrls: ['./body-manga.component.scss']
})

export class BodyMangaComponent {

  // Datos Globales
  public datos: any[] = []

  constructor(private mangaService: MangaDataService, private router: Router ) { }
 
 
  //--------------------------------------------------------------Carrousel---------------------------------------------------------------------------------------------
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined
  @ViewChild("sliderRef2") sliderRef2: ElementRef<HTMLElement> | undefined
  @ViewChild("thumbnailRef") thumbnailRef: ElementRef<HTMLElement> | undefined

  slider: KeenSliderInstance | undefined;
  slider2: KeenSliderInstance | undefined;
  thumbnailSlider: KeenSliderInstance | undefined

   //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ngOnInit() {
    this.getInitialDataCarrousel()
  }


  getInitialDataCarrousel() {
    this.mangaService.getData().subscribe((objetoManga: any) => {
      this.datos = objetoManga?.data
      this.datos[0].attributes.tags
      this.datos!.forEach((manga: MangaDataInfo) => {

        // Obteniendo coverFileName
        this.getCoverFileName(manga)

        // Obteniendo scanName
        this.mangaService.getScanNameData(manga)

        //Obteniendo Genres del manga
        this.mangaService.getGenres(manga)

        //Obteniendo Sinopsis
        this.mangaService.getDescription(manga)

        //Obteniendo nombre manga
        this.mangaService.getMangaName(manga)
    })
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
    if (this.slider2) this.slider2.destroy()
    if (this.thumbnailSlider) this.thumbnailSlider.destroy()
  }

  getCoverFileName(dataManga:MangaDataInfo){
    let coverId = dataManga?.relationships.find((dataRelation:Relationships) => dataRelation?.type == 'cover_art').id
    let mangaId = dataManga?.id
    this.mangaService?.getCoverName(coverId)?.subscribe((dataCover:any) => {
      let coverFileName = dataCover?.data?.attributes.fileName
      dataManga.urlCover = "https://uploads.mangadex.org/covers/" + mangaId + "/" + coverFileName + ".256.jpg"
      //--------------------------------------------------------------Carrousels--------------------------------------------------------------
      this.slider = new KeenSlider(this.sliderRef!.nativeElement, {
        breakpoints: {
          "(min-width: 400px)": {
            slides: { perView: 2, spacing: 5 },
          },
          "(min-width: 1000px)": {
            slides: { perView: 3, spacing: 10 },
          },
        },
        slides: { perView: 1 },
        loop: true
      })

      this.slider2 = new KeenSlider(this.sliderRef2!.nativeElement, {
        loop: true
      })
      this.thumbnailSlider = new KeenSlider(
        this.thumbnailRef!.nativeElement,
        {
          initial: 0,
          slides: {
            perView: 4,
            spacing: 5,
          },
          loop:true
        },
        [ThumbnailPlugin(this.slider2)]
      )
        // ----------------------------------------------------------------------------------------------------------------------------
    })
  }

}
