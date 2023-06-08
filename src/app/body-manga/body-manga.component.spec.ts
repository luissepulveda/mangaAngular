import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMangaComponent } from './body-manga.component';

describe('BodyMangaComponent', () => {
  let component: BodyMangaComponent;
  let fixture: ComponentFixture<BodyMangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyMangaComponent]
    });
    fixture = TestBed.createComponent(BodyMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
