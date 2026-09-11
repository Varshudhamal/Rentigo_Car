import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCarComponent } from './admin-add-car.component';

describe('AdminAddCarComponent', () => {
  let component: AdminAddCarComponent;
  let fixture: ComponentFixture<AdminAddCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
