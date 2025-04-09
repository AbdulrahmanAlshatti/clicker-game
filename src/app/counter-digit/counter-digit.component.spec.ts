import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDigitComponent } from './counter-digit.component';

describe('CounterDigitComponent', () => {
  let component: CounterDigitComponent;
  let fixture: ComponentFixture<CounterDigitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterDigitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterDigitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
