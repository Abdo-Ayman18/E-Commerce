import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashlistComponent } from './washlist.component';

describe('WashlistComponent', () => {
  let component: WashlistComponent;
  let fixture: ComponentFixture<WashlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WashlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WashlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
