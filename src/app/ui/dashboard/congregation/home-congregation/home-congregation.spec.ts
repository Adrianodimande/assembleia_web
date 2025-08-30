import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCongregation } from './home-congregation';

describe('HomeCongregation', () => {
  let component: HomeCongregation;
  let fixture: ComponentFixture<HomeCongregation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCongregation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCongregation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
