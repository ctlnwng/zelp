import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResponseComponent } from './new-response.component';

describe('NewResponseComponent', () => {
  let component: NewResponseComponent;
  let fixture: ComponentFixture<NewResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
