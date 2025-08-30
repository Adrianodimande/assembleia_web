import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMember } from './form-member';



describe('FormMember', () => {
  let component: FormMember;
  let fixture: ComponentFixture<FormMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMember]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
