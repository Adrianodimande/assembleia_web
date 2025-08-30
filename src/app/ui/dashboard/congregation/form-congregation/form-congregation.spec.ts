import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCongregation } from './form-congregation';

describe('FormCongregation', () => {
  let component: FormCongregation;
  let fixture: ComponentFixture<FormCongregation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCongregation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCongregation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
