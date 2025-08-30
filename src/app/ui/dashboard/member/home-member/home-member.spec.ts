import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMember } from './home-member';

describe('HomeMember', () => {
  let component: HomeMember;
  let fixture: ComponentFixture<HomeMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMember]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
