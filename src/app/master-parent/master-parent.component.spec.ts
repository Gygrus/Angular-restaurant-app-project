import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterParentComponent } from './master-parent.component';

describe('MasterParentComponent', () => {
  let component: MasterParentComponent;
  let fixture: ComponentFixture<MasterParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
