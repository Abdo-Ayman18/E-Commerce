import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllorderDetailsComponent } from './allorder-details.component';

describe('AllorderDetailsComponent', () => {
  let component: AllorderDetailsComponent;
  let fixture: ComponentFixture<AllorderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllorderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllorderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
