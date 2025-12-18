import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyData } from './modify-data';

describe('ModifyData', () => {
  let component: ModifyData;
  let fixture: ComponentFixture<ModifyData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
