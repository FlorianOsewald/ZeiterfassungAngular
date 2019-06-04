/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WallViewComponent } from './WallView.component';

describe('WallViewComponent', () => {
  let component: WallViewComponent;
  let fixture: ComponentFixture<WallViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
