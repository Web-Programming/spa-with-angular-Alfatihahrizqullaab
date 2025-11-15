import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LokasiperumahanComponent } from './lokasi-perumahan';

describe('LokasiPerumahan', () => {
  let component: LokasiperumahanComponent;
  let fixture: ComponentFixture<LokasiperumahanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LokasiperumahanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LokasiperumahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
