import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MangaDataService } from '../services/manga-data.service';
import { AttributeManga, MangaDataInfo, Relationships, Tag } from 'src/interface/bodyInterfaces';
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

   //--------------------------------------------------------------Carrousel---------------------------------------------------------------------------------------------

  ngOnInit() {
    this.getInitialDataCarrousel()
  }

  // navigateToManga(id:string, dataManga:string){

  //   //Obtener objeto con metodo navigateToManga()
  //   this.router.navigate(['manga',{data: JSON.stringify(dataManga)}])
  // }

  getInitialDataCarrousel() {
    this.mangaService.getData().subscribe((objetoManga: any) => {
      this.datos = objetoManga?.data
      this.datos[0].attributes.tags
      this.datos!.forEach((manga: MangaDataInfo) => {

        // Data para obtener coverFileName
        let coverId = manga?.relationships?.find((dataType: Relationships) => dataType?.type == 'cover_art').id
        let mangaId = manga?.id
        // Data para obtener el ultimo Chapter
        let idChapter = manga?.attributes?.latestUploadedChapter

        //Data genre
        let dataGenre = manga?.attributes.tags.map((dataGenre:Tag) => dataGenre.attributes.name.en)
        manga.genre = dataGenre.slice(0, 3)
        
        //Limito la cantidad de palabras permitidas para la sinopsis del manga
        const limitePalabras = 120
        let texto = manga?.attributes?.description?.en
        let palabras = texto?.split(' ');
        let textoLimitado = undefined;
        if(palabras?.length == undefined){
          textoLimitado = 'Without sinopsis'
          manga.description = textoLimitado
        }else{
          textoLimitado = palabras?.length > limitePalabras ? palabras?.slice(0, limitePalabras).join(' ') + "..." : texto;
          manga.description = textoLimitado
        }
        
        // ------------------------------------------------------------------------------------------------------------------------------------------
        let nameManga : any
        nameManga = manga.attributes.title.en
        let nameReplace = nameManga?.replace(/[^a-zA-Z0-9\s]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')
        manga.name = nameReplace

        console.log(manga)

        // Api para Cover Name
        this.mangaService.getCoverName(coverId).subscribe((coverName: any) => {
          let url = 'https://uploads.mangadex.org/covers/' + mangaId + "/" + coverName?.data?.attributes?.fileName + ".256.jpg"
          manga.url = url
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
        // Api para el chapter
        this.mangaService?.getChapterData(idChapter)?.subscribe((datosChapter: any) => {
          let dataChapter = datosChapter
          manga.chapter = dataChapter.data.attributes.chapter
          let idScan = dataChapter?.data?.relationships?.find((dataType: any) => dataType?.type == 'scanlation_group')?.id
          this.mangaService?.getScanName(idScan)?.subscribe((dataScan: any) => {
            manga.nombreScan = dataScan?.data?.attributes?.name
          })
        }
        )
      });
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
    if (this.slider2) this.slider2.destroy()
    if (this.thumbnailSlider) this.thumbnailSlider.destroy()
  }
}
