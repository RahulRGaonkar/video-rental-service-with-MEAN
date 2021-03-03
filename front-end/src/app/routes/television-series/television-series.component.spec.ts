import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelevisionSeriesComponent } from './television-series.component';

describe('TelevisionSeriesComponent', () => {
  let component: TelevisionSeriesComponent;
  let fixture: ComponentFixture<TelevisionSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelevisionSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelevisionSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
