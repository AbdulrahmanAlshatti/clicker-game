import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableUpgradeComponent } from './available-upgrade.component';

describe('AvailableUpgradeComponent', () => {
  let component: AvailableUpgradeComponent;
  let fixture: ComponentFixture<AvailableUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableUpgradeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
