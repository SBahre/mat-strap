import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTrialsComponent } from './tab-trials.component';

describe('TabTrialsComponent', () => {
  let component: TabTrialsComponent;
  let fixture: ComponentFixture<TabTrialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabTrialsComponent]
    });
    fixture = TestBed.createComponent(TabTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
