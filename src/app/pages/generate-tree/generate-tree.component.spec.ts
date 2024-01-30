import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTreeComponent } from './generate-tree.component';

describe('GenerateTreeComponent', () => {
  let component: GenerateTreeComponent;
  let fixture: ComponentFixture<GenerateTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateTreeComponent]
    });
    fixture = TestBed.createComponent(GenerateTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
