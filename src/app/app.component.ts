import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  title!: string;

  lockedUpgrades: ClickUpgrade[] = [];

  availableUpgrades: ClickUpgrade[] = [];

  unlockedUpgrades: ClickUpgrade[] = [];

  currency :number = 0;
  
  achievements: Achievement[] = [];
  lines:string[] = [];

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

  this.achievements.push(new Achievement('System Booted', "You clicked your way to the start of something big. Welcome to the game!", 5))
  this.achievements.push(new Achievement('Command Line Champion', "You’ve mastered the basics. No more point-and-click, just raw terminal power.", 10))
  this.achievements.push(new Achievement('Pixelated Perfection', "You’ve clicked through a thousand pixels. Your screen is a work of art.", 15))
  this.achievements.push(new Achievement('F1, F2... F5, F10', "Press all the right keys! You've unlocked the full keyboard, and it’s all at your fingertips.", 20))
  this.achievements.push(new Achievement('Cache Clearer', "You've clicked so many times, even your cache can't keep up. Who needs old data anyway?", 25))


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
    if(val == 0)
      return;

    this.counter += val; 
    this.currency += val; 
  
    this.lines.push('Malware increased by ' + val + ' to ' + this.counter)
    this.checkForUpgrades();
  }

  checkForUpgrades(){
    while(this.lockedUpgrades.length > 0 && this.counter >= this.lockedUpgrades[0].unlockRequirement){
      let availableUpgrade = <ClickUpgrade>this.lockedUpgrades.shift()
      this.availableUpgrades.push(availableUpgrade)
      this.lines.push('Unlocked Upgrade: ' + availableUpgrade.name)
    }

    while(this.achievements.length > 0 && this.counter >= this.achievements[0].unlockRequirement){
      let achievement = <Achievement>this.achievements.shift()
      this.lines.push('Achievement Unlocked: ' + achievement.name + ' - ' + achievement.description)
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

export class Achievement{
  name: string;
  description: string;
  unlockRequirement: number;
  
  constructor(name: string, description:string,unlockRequirement: number){
    this.name = name;
    this.description = description;
    this.unlockRequirement = unlockRequirement;
   }
}

