import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaReaderComponent } from './manga-reader.component';

describe('MangaReaderComponent', () => {
  let component: MangaReaderComponent;
  let fixture: ComponentFixture<MangaReaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangaReaderComponent]
    });
    fixture = TestBed.createComponent(MangaReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
