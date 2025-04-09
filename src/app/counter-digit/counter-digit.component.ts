import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-digit',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './counter-digit.component.html',
  styleUrl: './counter-digit.component.less'
})
export class CounterDigitComponent {
  fontsize: number = 30;
  offset: number = 1;

  setValue(value: number){
    this.offset = value;
  }

  applyStyles(){
    const styles = {'transform' : 'translateY('+ -(this.offset* this.fontsize)+'px)',
      'font-size': this.fontsize + 'px'

    };
    return styles;
  }

}
