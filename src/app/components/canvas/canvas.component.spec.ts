import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';
import { FormsModule } from '@angular/forms';

fdescribe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
