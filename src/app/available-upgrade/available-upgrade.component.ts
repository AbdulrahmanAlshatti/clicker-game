import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClickUpgrade } from '../app.component';

@Component({
  selector: 'app-available-upgrade',
  standalone: true,
  imports: [],
  templateUrl: './available-upgrade.component.html',
  styleUrl: './available-upgrade.component.less'
})
export class AvailableUpgradeComponent {
  
  @Input() upgrade!:ClickUpgrade;
  
  @Output() purchaseClickedEvent = new EventEmitter<ClickUpgrade>();
  
  @Input() currency!: number;
  
  purchase() {   
    if(this.currency >= this.upgrade.price)
      this.purchaseClickedEvent.emit(this.upgrade);
  }
  
  applyStyles() {
    let styles = {}
    if(this.currency >= this.upgrade.price)
      styles = { 'display': 'block'};
    else 
      styles = { 'display': 'none'};

    return styles;
  }

  GetDisabled() {
    return this.currency < this.upgrade.price
  }

  
}
