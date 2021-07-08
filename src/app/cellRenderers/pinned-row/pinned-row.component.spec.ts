import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedRowComponent } from './pinned-row.component';

describe('PinnedRowComponent', () => {
  let component: PinnedRowComponent;
  let fixture: ComponentFixture<PinnedRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnedRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
