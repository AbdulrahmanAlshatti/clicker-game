import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterDigitComponent } from "./counter-digit/counter-digit.component";
import { AvailableUpgradeComponent } from "./available-upgrade/available-upgrade.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AvailableUpgradeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  counter :number = 0;
  counterAdder:number = 1;
  passiveCounter:number = 0;

  lockedUpgrades: ClickUpgrade[] = [];

  availableUpgrades: ClickUpgrade[] = [];

  unlockedUpgrades: ClickUpgrade[] = [];

  currency :number = 0;
  


constructor(){
  this.lockedUpgrades.push(new ClickUpgrade('Multiply upgrade1', 2, 5, 10, UpgradeType.Multiply));    
  this.lockedUpgrades.push(new ClickUpgrade('Multiply upgrade2', 5, 10, 20, UpgradeType.Multiply));    
  this.lockedUpgrades.push(new ClickUpgrade('Multiply upgrade3', 8, 20, 30, UpgradeType.Multiply));    
  this.lockedUpgrades.push(new ClickUpgrade('Multiply upgrade4', 20, 40, 40, UpgradeType.Multiply));    

  this.lockedUpgrades.push(new ClickUpgrade('Passive upgrade4', 3, 8, 2, UpgradeType.Passive));    
  this.lockedUpgrades.push(new ClickUpgrade('Passive upgrade4', 6, 15, 4, UpgradeType.Passive));    
  this.lockedUpgrades.push(new ClickUpgrade('Passive upgrade4', 9, 25, 6, UpgradeType.Passive));    
  this.lockedUpgrades.push(new ClickUpgrade('Passive upgrade4', 25, 45, 8, UpgradeType.Passive));    

  this.lockedUpgrades = this.lockedUpgrades.sort( (a,b)=>(a.unlockRequirement-b.unlockRequirement));

  setInterval(()=>{
    this.increaseValue(this.passiveCounter)
  },1000);

}

GetCurrency(){
  return this.currency;
}

purchase(clickUpgrade: ClickUpgrade ){

  if(this.currency < clickUpgrade.price)
    return;

  let index = this.availableUpgrades.indexOf(clickUpgrade)
  if (index > -1) 
    this.availableUpgrades.splice(index, 1);

  this.unlockedUpgrades.push(clickUpgrade);
  this.currency -= clickUpgrade.price;


  if(clickUpgrade.type == UpgradeType.Multiply)
    this.counterAdder *= clickUpgrade.value;
else if(clickUpgrade.type == UpgradeType.Passive)
  this.passiveCounter += clickUpgrade.value;
 


}

// constructor(private cd: CounterDigitComponent){}

  clicked() {
    this.increaseValue(this.counterAdder)
  }

  increaseValue(val:number){
    this.counter += val; 
    this.currency += val; 
    this.checkForUpgrades();
  }

  checkForUpgrades(){
    if(this.lockedUpgrades.length == 0)
      return;

    if(this.counter >= this.lockedUpgrades[0].unlockRequirement){
      this.availableUpgrades.push((<ClickUpgrade>this.lockedUpgrades.shift()))
    }
  }



}

export enum UpgradeType {
  Multiply,
  Passive,
}

export class ClickUpgrade{
  name: string;
  unlockRequirement: number;
  price:number;
  value:number;
  type:UpgradeType;

   constructor(name: string, unlockRequirement: number, price:number, value: number, type: UpgradeType){
    this.name = name;
    this.unlockRequirement = unlockRequirement;
    this.price = price;
    this.value = value;
    this.type = type;
   }
}


