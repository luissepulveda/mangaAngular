import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMangaComponent } from './header-manga.component';

describe('HeaderMangaComponent', () => {
  let component: HeaderMangaComponent;
  let fixture: ComponentFixture<HeaderMangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMangaComponent]
    });
    fixture = TestBed.createComponent(HeaderMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
