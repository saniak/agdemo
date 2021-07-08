import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCellRendererComponent } from './crud-cell-renderer.component';

describe('CrudCellRendererComponent', () => {
  let component: CrudCellRendererComponent;
  let fixture: ComponentFixture<CrudCellRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudCellRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
