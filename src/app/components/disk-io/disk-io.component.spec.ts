import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiskIoComponent} from './disk-io.component';

describe('DiskIoComponent', () => {
  let component: DiskIoComponent;
  let fixture: ComponentFixture<DiskIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiskIoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
