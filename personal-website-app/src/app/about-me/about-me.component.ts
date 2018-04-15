import { Component, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'parker-about',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  @Output() changeTabIndex = new EventEmitter();

  traitsList = ['Hard Working', 'Motivated', 'Team Player', 'Open Minded', 'Data Driven', 'Independant'];
  colorMap: Map<string, string> = new Map();
  greetingCompleted = false;

  ngOnInit() {
    this.traitsList.forEach(trait => {
      this.colorMap.set(trait, 'primary');
    });
  }

  changeChipColor(event: Event): void {
    const trait = event.target['innerText'];
    this.colorMap.set(trait, this.colorMap.get(trait) === 'primary' ? 'accent' : 'primary');
  }

  onFirstTypingAnimationComplete () {
    this.greetingCompleted = true;
  }
}
