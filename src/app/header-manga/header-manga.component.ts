import { Component,OnInit , TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MangaDataService } from '../services/manga-data.service';

@Component({
  selector: 'app-header-manga',
  templateUrl: './header-manga.component.html',
  styleUrls: ['./header-manga.component.scss']
})
export class HeaderMangaComponent {

  closeResult: string | undefined;

	constructor(private offcanvasService: NgbOffcanvas) {}

	openScroll(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { scroll: true, backdrop: false });
	}
}

