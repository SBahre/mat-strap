import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accordion-trials',
  templateUrl: './accordion-trials.component.html',
  styleUrls: ['./accordion-trials.component.scss'],
})
export class AccordionTrialsComponent {
  panelOpenState = false;
  statusList = ['Open', 'Closed', 'Undecided'];
  constructor() {}
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  applyDateRange() {
    this.range.value;
    console.log('Start Date: ' + this.range.value['start']);
    console.log('End Date: ' + this.range.value['end']);
  }
}
