import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPageComponent } from './edit-page.component';



describe('CreateComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPageComponent]
    });
    fixture = TestBed.createComponent(EditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});