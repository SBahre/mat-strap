import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-trials',
  templateUrl: './tab-trials.component.html',
  styleUrls: ['./tab-trials.component.scss'],
})
export class TabTrialsComponent {
  rowDetails = { siteCode: 'Code420', siteType: 'Type 1' };

  projectIndicators = ['Code 420', 'Code 421', 'Code 654'];
}
